/** @jsxImportSource @emotion/react */

import './ModelsSearch.less';

import { Badge, Button, Input, message, Skeleton, Typography } from 'antd';
import { proxy, useProxy } from 'valtio';
import { Suspense, useCallback, useState } from 'react';
import _ from 'lodash';
import Modal from 'antd/lib/modal/Modal';
import { ModelButton } from '../../common/Buttons';
import { ModelButtonsGrid } from './ModelBrowser';
import { addModel } from 'actions/editor/model';
import { getModel, searchModels, upload } from 'service/model';
import { Popover } from 'components/common/Popover';
import useUpdateEffect from 'utils/useUpdateEffect';
import { getModelBadgeDotColor, getModelBadgeDotTitle } from 'utils/model';
import { ApiModel } from 'types/model';

let modelsSearchState = proxy({ models: searchModels(), search: '' });

const debouncedCb = _.debounce(fn => fn(), 500);

const { Paragraph, Text } = Typography;

function ModelsSearch() {
  let { search } = useProxy(modelsSearchState);

  let runSearch = useCallback(
    () => (modelsSearchState.models = searchModels(search)),
    [search],
  );

  useUpdateEffect(() => {
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
      <Suspense fallback={<Skeleton round />}>
        <ModelsSearchResult runSearch={runSearch} />
      </Suspense>
    </>
  );
}

interface ModelsSearchResultProps {
  runSearch: () => Promise<ApiModel[]>;
}
function ModelsSearchResult({ runSearch }: ModelsSearchResultProps) {
  let { models } = useProxy(modelsSearchState);
  let [triggerModelId, setTriggerModelId] = useState<null | string>(null);

  let triggerModel = models.find(model => model.id === triggerModelId);

  return (
    <>
      <ModelButtonsGrid>
        {models.map(modelData => {
          return (
            <Badge
              key={modelData.id}
              dot
              title={getModelBadgeDotTitle(modelData.status)}
              color={getModelBadgeDotColor(modelData.status)}
            >
              <Popover
                mouseEnterDelay={0.5}
                overlayClassName="ModelsSearch__popover-overlay"
                content={
                  <img
                    css={{ maxWidth: 900 }}
                    src={modelData.imgLarge}
                    alt={modelData.name}
                  ></img>
                }
                trigger="hover"
                placement="right"
              >
                <ModelButton
                  name={modelData.name}
                  src={modelData.imgSmall}
                  onClick={() => {
                    switch (modelData.status) {
                      case 'uploaded': {
                        addModel('custom', {
                          modelUrl: modelData.gltfUrl!,
                          name: modelData.name,
                        });
                        break;
                      }
                      case 'not-uploaded': {
                        setTriggerModelId(modelData.id);
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
              </Popover>
            </Badge>
          );
        })}
      </ModelButtonsGrid>

      <Modal
        centered
        visible={!!triggerModel}
        footer={false}
        onCancel={() => setTriggerModelId(null)}
        title={<>Trigger uploading</>}
        destroyOnClose
      >
        {triggerModel && (
          <TriggerUploading
            runSearch={runSearch}
            close={() => setTriggerModelId(null)}
            model={triggerModel}
          />
        )}
      </Modal>
    </>
  );
}

interface TriggerUploadingProps {
  model: ApiModel;
  runSearch: () => Promise<ApiModel[]>;
  close(): void;
}
function TriggerUploading({ model, runSearch, close }: TriggerUploadingProps) {
  let [refreshModel, setRefreshModel] = useState<null | ApiModel>(null);
  let [loading, setLoading] = useState(false);

  async function triggerUpload() {
    setLoading(true);
    try {
      await upload(model);

      while (true) {
        let refreshModel = await getModel(model.id);
        setRefreshModel(refreshModel);
        if (
          refreshModel.status === 'uploading' ||
          refreshModel.status === 'not-uploaded'
        ) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        } else {
          break;
        }
      }

      message.info(`${model.name} is uploaded you can click on it to use it`);
    } catch {
      message.info(
        `${model.name} Failed while Uploading we will try to fix this soon`,
      );
    } finally {
      setLoading(false);
      close();
      runSearch();
    }
  }

  let displayModel = refreshModel ?? model;
  let disableUpload =
    displayModel.status === 'uploaded' ||
    displayModel.status === 'error-while-uploading';
  let isLoading = loading || displayModel.status === 'uploading';

  return (
    <div>
      <Paragraph>
        Uploading{' '}
        <Text underline strong>
          ({model.name})
        </Text>{' '}
        model?
      </Paragraph>

      <Paragraph>
        <img
          css={{ width: '100%' }}
          src={model.imgLarge}
          alt={model.name}
        ></img>
      </Paragraph>

      <Paragraph type="success" code>
        status: {displayModel.statusMessage}
      </Paragraph>

      <Button
        loading={isLoading}
        disabled={disableUpload}
        type="primary"
        block
        onClick={triggerUpload}
      >
        Upload
      </Button>
    </div>
  );
}

export default ModelsSearch;
