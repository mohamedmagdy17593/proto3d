/** @jsxImportSource @emotion/react */

import './ModelsSearch.less';

import { Badge, Input, message, Skeleton } from 'antd';
import { proxy, useProxy } from 'valtio';
import { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { ModelButton } from '../../common/Buttons';
import { ModelButtonsGrid } from './ModelBrowser';
import { addModel } from 'actions/editor/model';
import { getModel, searchModels, upload } from 'service/model';
import { Popover } from 'components/common/Popover';
import { getModelBadgeDotColor, getModelBadgeDotTitle } from 'utils/model';
import { ApiModel } from 'types/model';

interface ModelsSearchState {
  models?: ApiModel[];
  loading: boolean;
  search: string;
}
const modelsSearchState: ModelsSearchState = proxy({
  loading: true,
  search: '',
});

const debouncedCb = _.debounce(fn => fn(), 500);

function ModelsSearch() {
  let { search, loading } = useProxy(modelsSearchState);

  let runSearch = useCallback(() => {
    searchModels(search).then(models => {
      Object.assign(modelsSearchState, { models, loading: false });
    });
  }, [search]);

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
      {loading ? <Skeleton /> : <ModelsSearchResult />}
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
      message.loading({ content: 'Upload requested', key });
      await upload(model);

      while (true) {
        let refreshModel = await getModel(model.id);
        modelsSearchState.models = modelsSearchState.models?.map(model => {
          if (model.id === refreshModel.id) {
            return refreshModel;
          }
          return model;
        });
        message.loading({ content: refreshModel.statusMessage, key });
        if (
          refreshModel.status === 'uploading' ||
          refreshModel.status === 'not-uploaded'
        ) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        } else {
          break;
        }
      }

      message.success({
        content: `${model.name} is uploaded you can click on it to use it`,
        duration: 300,
        key,
      });
    } catch {
      message.error({
        content: `${model.name} Failed while Uploading we will try to fix this soon`,
        duration: 300,
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
