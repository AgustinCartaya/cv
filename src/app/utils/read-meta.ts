import fs from 'fs'
import path from 'path'

export interface MetaData {
  [key: string]: any // Para añadir dinámicamente las carpetas
}

// Función para leer un directorio
const readDirectory = (dir: string): string[] => {
  return fs.existsSync(dir) && fs.lstatSync(dir).isDirectory() ? fs.readdirSync(dir) : []
}

// Función para leer un archivo JSON
const readJsonFile = (filePath: string): any => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

// Verificar si una ruta es un directorio
const isDirectory = (filePath: string): boolean => fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()

// Obtener todos los archivos de un directorio con una extensión opcional
const getFilesFromDirectory = (dir: string, extension?: string): string[] => {
  return readDirectory(dir)
    .filter(file => !extension || path.extname(file) === extension)
    .map(file => path.join(dir, file))
}

// Mapear las rutas a partir de un basePath
const mapPaths = (paths: string[], basePath: string): string[] => {
  return paths.map(filePath => `/${path.relative(basePath, filePath).replace(/\\/g, '/')}`)
}

// Mapear archivos a un objeto con título y ruta fuente
const mapFiles = (files: string[], basePath: string): { title: string; source: string }[] => {
  return files.map(file => ({
    title: path.basename(file, path.extname(file)),
    source: `/${path.relative(basePath, file).replace(/\\/g, '/')}`,
  }))
}

// Obtener metadatos desde una carpeta
const getMetaDataFromFolder = (folderPath: string, locale: string): MetaData | null => {
  const metaFilePath = path.join(folderPath, `${locale}.json`)
  if (!fs.existsSync(metaFilePath)) {
    return null
  }

  const data = readJsonFile(metaFilePath)
  const relativeBasePath = path.join(process.cwd(), 'public')

  const metaData: MetaData = {
    ...data,
    images: [],
    files: [],
  }

  // Buscar dinámicamente las subcarpetas dentro del directorio actual
  const subfolders = readDirectory(folderPath).filter(subfolder => isDirectory(path.join(folderPath, subfolder)))

  subfolders.forEach(subfolderName => {
    const subfolderPath = path.join(folderPath, subfolderName)
    const files = getFilesFromDirectory(subfolderPath)
    // Mapear dinámicamente según el nombre de la carpeta
    if (subfolderName.toLowerCase().includes('images')) {
      metaData.images = mapPaths(files, relativeBasePath)
    } else {
      // Para otras carpetas, agregar propiedades dinámicas
      metaData.files.push({ ...mapFiles(files, relativeBasePath)[0], title: subfolderName })
    }
  })

  return metaData
}

// Leer metadatos de las carpetas y subcarpetas
export const readMeta = (dir: string, locale: string = 'meta'): MetaData[] => {
  const projectDir = path.join(process.cwd(), dir)
  const folders = readDirectory(projectDir).filter(folder => isDirectory(path.join(projectDir, folder)))
  const metaData: MetaData[] = []

  folders.forEach(folder => {
    const folderPath = path.join(projectDir, folder)
    const data = getMetaDataFromFolder(folderPath, locale)

    if (data) {
      metaData.push(data)

      // Leer subcarpetas dentro de cada carpeta principal
      const subfolders = readDirectory(folderPath).filter(subfolder => isDirectory(path.join(folderPath, subfolder)))
      subfolders.forEach(subfolder => {
        const subfolderPath = path.join(folderPath, subfolder)
        const subfolderData = getMetaDataFromFolder(subfolderPath, locale)
        if (subfolderData) {
          metaData.push(subfolderData)
        }
      })
    }
  })

  return metaData
}
