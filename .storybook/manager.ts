import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const brandTheme = create({
  base: 'dark',
  brandTitle: 'Tetloose Next',
  brandUrl: 'https://tetloose.com',
  brandImage: '/assets/images/logo.svg',
  brandTarget: '_blank'
})

addons.setConfig({
  theme: brandTheme
})
