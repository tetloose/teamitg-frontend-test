import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const brandTheme = create({
  base: 'dark',
  brandTitle: 'TeamITG',
  brandUrl: 'https://github.com/tetloose/teamitg-frontend-test',
  brandImage: '/assets/images/logo.svg',
  brandTarget: '_blank'
})

addons.setConfig({
  theme: brandTheme
})
