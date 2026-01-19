// @ts-check

import { buttonFactory } from '#shared/smartFaceComponentFactories/core/buttonFactory';

import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fileManagerFactory } from '../../../../shared/smartFaceComponentFactories/core/fileManagerFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

/**
 * @param { number } counter
 * @param { import('../../../../src/adapters/core/FileManagerAdapter/FileManagerAdapter.types').FileManagerBackendProps["mode"] } mode
 * @returns
 */

const single = fileManagerFactory(
  {
    label: `File Upload single`,
    name: `file-manager-name-single`,
    mode: 'single',
    validations: {
      sizeOfSingleFile: {
        value: 5 * 1024 * 1024,
      },
    },
  },
  `file-manager-single`,
  'data-guide-testfm',
);

const multiple = fileManagerFactory(
  {
    label: `File Upload multi`,
    name: `file-manager-multi`,
    onRemoveFiles: [
      {
        type: 'file-manager-post',
        targetSfIds: ['file-manager-multi'],
      },
    ],
    mode: 'multi',
    validations: {
      sizeOfAllFiles: {
        value: 5 * 1024 * 1024,
      },
      maxFileAmount: {
        value: 4,
      },
    },
  },
  `file-manager-multi`,
  'data-guide-testfm',
);

const growing = fileManagerFactory(
  {
    label: `File Upload grow`,
    name: `file-manager-name-grow`,
    mode: 'growing',
    validations: {
      sizeOfAllFiles: {
        value: 5 * 1024 * 1024,
      },
      maxFileAmount: {
        value: 4,
      },
    },
  },
  `file-manager-grow`,
  'data-guide-testfm',
);

const allowedFileTypes = fileManagerFactory(
  {
    label: `File Upload - Allowed File Type`,
    name: `file-manager-name-allowed-type`,
    mode: 'single',
    validations: {
      allowedFileTypes: {
        value: ['application/pdf'],
        extensions: ['pdf'],
        errorMessage: 'Only PDF is allowed.',
      },
    },
  },
  `file-manager-allowed-types`,
  'data-guide-testfm',
);

const emptyFileTest = fileManagerFactory(
  {
    label: `File Upload - Empty File Test`,
    name: `file-manager-name-empty-file`,
    mode: 'single',
    validations: {
      emptyFile: {
        errorMessage: 'Empty file is not allowed.',
      },
    },
  },
  `file-manager-empty-file`,
  'data-guide-testfm',
);

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const fileManagerPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'File Manager Page' } },
      componentChildren: [
        classicLayoutFactory({
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      cardFactory({
                        title: `File Upload - single`,
                        bodyChildren: [
                          formFactory(
                            {
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [single],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          size: 'medium',
                                          text: 'disable',
                                          color: 'danger',
                                          corner: 'rounded',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-single`,
                                                    operation: 'write',
                                                    path: 'props.disabled',
                                                    value: true,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                      ],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          size: 'medium',
                                          text: 'enable',
                                          color: 'success',
                                          corner: 'rounded',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-single`,
                                                    operation: 'write',
                                                    path: 'props.disabled',
                                                    value: false,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            `form-upload-single`,
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      cardFactory({
                        title: `File Upload - multi`,
                        bodyChildren: [
                          formFactory(
                            {
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [multiple],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Max files: 3',
                                          variant: 'ghost',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-multi`,
                                                    operation: 'write',
                                                    path: 'props.validations.maxFileAmount.value',
                                                    value: 3,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                        buttonFactory({
                                          text: 'Max files: 5',
                                          variant: 'ghost',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-multi`,
                                                    operation: 'write',
                                                    path: 'props.validations.maxFileAmount.value',
                                                    value: 5,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                        buttonFactory({
                                          text: 'Max files: 10',
                                          variant: 'ghost',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-multi`,
                                                    operation: 'write',
                                                    path: 'props.validations.maxFileAmount.value',
                                                    value: 10,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            `form-upload-multi`,
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      cardFactory({
                        title: `File Upload - grow`,
                        bodyChildren: [
                          formFactory(
                            {
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [growing],
                                    }),
                                    gridItemFactory({
                                      componentChildren: [
                                        buttonFactory({
                                          text: 'Max files: 3',
                                          variant: 'ghost',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-grow`,
                                                    operation: 'write',
                                                    path: 'props.validations.maxFileAmount.value',
                                                    value: 3,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                        buttonFactory({
                                          text: 'Max files: 5',
                                          variant: 'ghost',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-grow`,
                                                    operation: 'write',
                                                    path: 'props.validations.maxFileAmount.value',
                                                    value: 5,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                        buttonFactory({
                                          text: 'Max files: 10',
                                          variant: 'ghost',
                                          onClick: [
                                            {
                                              type: 'request',
                                              data: {
                                                action: 'reflect',
                                                reflectedData: patchFactory([
                                                  {
                                                    targetSfId: `file-manager-grow`,
                                                    operation: 'write',
                                                    path: 'props.validations.maxFileAmount.value',
                                                    value: 10,
                                                  },
                                                ]),
                                              },
                                            },
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            `form-upload-grow`,
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      cardFactory({
                        title: `File Upload - Allowed File Types Test`,
                        bodyChildren: [
                          formFactory(
                            {
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [allowedFileTypes],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            `form-upload-allowed-types`,
                          ),
                        ],
                      }),
                    ],
                  }),
                  gridItemFactory({
                    size: 6,
                    componentChildren: [
                      cardFactory({
                        title: `File Upload - Empty File Test`,
                        bodyChildren: [
                          formFactory(
                            {
                              componentChildren: [
                                gridFactory({
                                  items: [
                                    gridItemFactory({
                                      componentChildren: [emptyFileTest],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            `form-upload-empty-file`,
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          },
          footer,
          sidebar: sidebar('file-manager-page', ['form-pages']),
        }),
      ],
    }),
  ],
});
