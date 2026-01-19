import { argv } from 'bun';
import { Command } from 'commander';
import { config } from 'dotenv';

import generateFontAwesomeIconNameLists from './generateFontAwesomeIconNameLists.js';
import generateMaterialDesignIconNameList from './generateMaterialDesignIconNameList.js';
import removeWidthAndHeight from './removeMaterialDesignIconSizeProps.js';

config();
await (async () => {
  const program = new Command();

  program
    .command('generate-font-awesome-icon-name-lists')
    .description('Generate Font-Awesome Icon name lists')
    .action(async () => {
      await generateFontAwesomeIconNameLists();
    });

  program
    .command('generate-material-design-icon-name-list')
    .description('Generate Material-Design Icon name list')
    .action(async () => {
      await generateMaterialDesignIconNameList();
    });
  program
    .command('remove-size-material-design-icons')
    .description('Remove-size-material-design-icons')
    .action(async () => {
      await removeWidthAndHeight();
    });

  // not sure if needed
  program.parse(argv);
})();
