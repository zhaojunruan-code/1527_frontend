import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'

import { Resvg } from '@resvg/resvg-js'

const require = createRequire(import.meta.url)
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const lucidePackageJson = require.resolve('@lucide/vue/package.json')
const lucideIconsDir = path.join(path.dirname(lucidePackageJson), 'dist', 'esm', 'icons')

const iconNames = [
  'bot',
  'briefcase-business',
  'car',
  'chevron-right',
  'circle-check',
  'clipboard-list',
  'clock',
  'headphones',
  'heart',
  'house',
  'info',
  'mail',
  'map',
  'map-pin',
  'phone',
  'refresh-ccw',
  'search',
  'settings',
  'user',
  'user-check',
  'wallet',
  'circle-x',
]

const colors = [
  'a60000',
  '6b7280',
  '9ca3af',
  'cccccc',
  'e91e63',
  '757575',
  '2196f3',
  'ff9800',
  '4caf50',
  '8a6a00',
  '1565c0',
  '2e7d32',
  '616161',
  '7b1fa2',
]

const imageSvgConversions = [
  {
    input: path.join(projectRoot, 'src', 'static', 'images', 'app-logo.svg'),
    output: path.join(projectRoot, 'src', 'static', 'images', 'app-logo.png'),
    width: 96,
  },
  {
    input: path.join(projectRoot, 'src', 'static', 'images', 'home-top-bg.svg'),
    output: path.join(projectRoot, 'src', 'static', 'images', 'home-top-bg.png'),
    width: 1125,
  },
]

const attrsToString = (attrs) =>
  Object.entries(attrs)
    .map(([key, value]) => `${key}="${String(value).replace(/"/g, '&quot;')}"`)
    .join(' ')

const iconNodeToSvg = (iconNode, color) => {
  const children = iconNode
    .map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)} />`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${children}</svg>`
}

const renderSvgToPng = (svg, width) => {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  })

  return resvg.render().asPng()
}

const generateLucideIcons = async () => {
  const outputRoot = path.join(projectRoot, 'src', 'static', 'icons', 'lucide')
  await rm(outputRoot, { recursive: true, force: true })

  for (const iconName of iconNames) {
    const iconModulePath = path.join(lucideIconsDir, `${iconName}.js`)
    const iconModule = await import(pathToFileURL(iconModulePath).href)
    const iconNode = iconModule.__iconNode

    if (!iconNode) {
      throw new Error(`Missing __iconNode for ${iconName}`)
    }

    const iconOutputDir = path.join(outputRoot, iconName)
    await mkdir(iconOutputDir, { recursive: true })

    for (const color of colors) {
      const svg = iconNodeToSvg(iconNode, `#${color}`)
      const png = renderSvgToPng(svg, 96)
      await writeFile(path.join(iconOutputDir, `${color}.png`), png)
    }
  }
}

const convertImageSvgs = async () => {
  for (const item of imageSvgConversions) {
    const svg = await readFile(item.input, 'utf8')
    const png = renderSvgToPng(svg, item.width)
    await writeFile(item.output, png)
  }
}

const main = async () => {
  await generateLucideIcons()
  await convertImageSvgs()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
