/** @jsxImportSource @emotion/react */

import './ModelsSearch.less';

import { Badge, Button, Input, message, Skeleton, Typography } from 'antd';
import { proxy, useProxy } from 'valtio';
import { useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';
import { ModelButton } from '../../common/Buttons';
import { ModelButtonsGrid } from './ModelBrowser';
import { addModel } from 'actions/editor/model';
import { getModel, searchModels, upload } from 'service/model';
import { getModelBadgeDotColor, getModelBadgeDotTitle } from 'utils/model';
import { ApiModel } from 'types/model';
import { wait } from 'utils/helpers';

const { Paragraph } = Typography;

interface ModelsSearchState {
  models: ApiModel[];
  search: string;
  loading: boolean;
  loadingMore: boolean;
  cursor: number;
  error: any;
}

const modelsSearchState = proxy<ModelsSearchState>({
  models: [],
  loading: true,
  loadingMore: false,
  error: null,
  search: '',
  cursor: 0,
});

const debouncedCb = _.debounce(fn => fn(), 500);

function ModelsSearch() {
  let { search, loading, error, models, cursor, loadingMore } = useProxy(
    modelsSearchState,
  );

  let runSearchCountRef = useRef(0);
  let runSearch = useCallback(async () => {
    try {
      modelsSearchState.error = null;
      modelsSearchState.loading = true;
      let thisRunSearchCount = ++runSearchCountRef.current;
      let models = await searchModels({ search, cursor: 0 });
      if (thisRunSearchCount === runSearchCountRef.current) {
        Object.assign(modelsSearchState, {
          models,
          loading: false,
          loadingMore: false,
          cursor: 0,
        });
      }
    } catch (e: any) {
      modelsSearchState.error = e;
    }
  }, [search]);

  let loadMore = useCallback(async () => {
    try {
      modelsSearchState.error = null;
      modelsSearchState.loadingMore = true;
      let newCursor = cursor + 24 * 2;
      let newModels = [
        ...models,
        ...(await searchModels({ search, cursor: newCursor })),
      ];
      Object.assign(modelsSearchState, {
        models: newModels,
        loading: false,
        loadingMore: false,
        cursor: newCursor,
      });
    } catch (e: any) {
      modelsSearchState.error = e;
    }
  }, [cursor, models, search]);

  useEffect(() => {
    debouncedCb(() => {
      runSearch();
    });
  }, [runSearch]);

  return (
    <>
      <Input
        css={{ marginBottom: 12 }}
        size="small"
        placeholder={`Search`}
        onKeyDown={e => e.stopPropagation()}
        onChange={e => (modelsSearchState.search = e.target.value)}
      />
      {error ? (
        <div
          css={{
            width: '100%',
            height: 250,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paragraph type="danger">Error 😔</Paragraph>
        </div>
      ) : loading ? (
        <Skeleton />
      ) : models.length === 0 ? (
        <div
          css={{
            width: '100%',
            height: 250,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paragraph>No Search results</Paragraph>
        </div>
      ) : (
        <>
          <ModelsSearchResult />
          <Button
            css={{ marginTop: 12 }}
            type="dashed"
            block
            loading={loadingMore}
            onClick={() => {
              loadMore();
            }}
          >
            Load more
          </Button>
        </>
      )}
    </>
  );
}

function ModelsSearchResult() {
  let { models } = useProxy(modelsSearchState);

  return (
    <ModelButtonsGrid>
      {(models as ApiModel[]).map(modelData => {
        return <CustomModelButton key={modelData.id} model={modelData} />;
      })}
    </ModelButtonsGrid>
  );
}

interface CustomModelButtonProps {
  model: ApiModel;
}
function CustomModelButton({ model }: CustomModelButtonProps) {
  async function triggerUpload() {
    let key = model.id;
    try {
      message.loading({ content: 'Upload requested', key, duration: 0 });
      await upload(model);

      while (true) {
        let refreshModel = await getModel(model.id);
        // update state of current model
        modelsSearchState.models = modelsSearchState.models?.map(model => {
          if (model.id === refreshModel.id) {
            return refreshModel;
          }
          return model;
        });
        message.loading({
          content: refreshModel.statusMessage,
          key,
          duration: 0,
        });
        if (
          refreshModel.status === 'uploading' ||
          refreshModel.status === 'not-uploaded'
        ) {
          await wait(3000);
        } else {
          break;
        }
      }

      message.success({
        content: `${model.name} is uploaded you can click on it to use it`,
        duration: 2,
        key,
      });
    } catch {
      message.error({
        content: `${model.name} Failed while Uploading we will try to fix this soon`,
        duration: 2,
        key,
      });
    }
  }

  return (
    <Badge
      dot
      title={getModelBadgeDotTitle(model.status)}
      color={getModelBadgeDotColor(model.status)}
    >
      {/* <Popover
        mouseEnterDelay={0.5}
        overlayClassName="ModelsSearch__popover-overlay"
        content={
          <img css={{ maxWidth: 900 }} src={model.imgLarge} alt={model.name} />
        }
        trigger="hover"
        placement="right"
      > */}
      <ModelButton
        name={model.name}
        src={model.imgSmall}
        onClick={() => {
          switch (model.status) {
            case 'uploaded': {
              addModel('custom', {
                modelUrl: model.gltfUrl!,
                name: model.name,
              });
              break;
            }
            case 'not-uploaded': {
              triggerUpload();
              break;
            }
            case 'uploading': {
              message.info(
                `This model is Currently uploading try later maybe it's done`,
              );
              break;
            }
            case 'error-while-uploading': {
              message.info(
                `Failed to upload, We investigate why this is happened`,
              );
            }
          }
        }}
      />
      {/* </Popover> */}
    </Badge>
  );
}

export default ModelsSearch;
