import type { GRID_COLS, GRID_GAPS } from './grid.constants'
import type {
  GlobalChildren,
  GlobalClassNames,
  GlobalHtmlTag
} from '@global/global.types'

export type GridCol = (typeof GRID_COLS)[number]
export type GridGap = (typeof GRID_GAPS)[number]

export type GridSharedProps = GlobalClassNames & GlobalChildren & GlobalHtmlTag

export type GridRootProps = {
  gap?: GridGap
  cols?: GridCol
  mobileCols?: GridCol
  tabletCols?: GridCol
  desktopCols?: GridCol
} & GridSharedProps
