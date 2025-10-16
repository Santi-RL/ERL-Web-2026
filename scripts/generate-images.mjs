import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import fetch from 'node-fetch';
import sharp from 'sharp';

const OUTPUT_DIR = resolve(process.cwd(), 'public/img/generated');
const MANIFEST_PATH = resolve(process.cwd(), 'src/data/image-manifest.json');

const FORMATS = [
  {
    ext: 'avif',
    options: { quality: 55 },
  },
  {
    ext: 'webp',
    options: { quality: 70 },
  },
  {
    ext: 'jpg',
    options: { quality: 82, progressive: true },
  },
];

const DEFAULT_SIZES = [480, 768, 1024, 1365];

const IMAGES = [
  {
    name: 'hero-equipo',
    source:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=95',
    alt: 'Equipo contable trabajando',
  },
  {
    name: 'reunion-estrategica',
    source:
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=95',
    alt: 'Reunión de equipo en oficina moderna',
  },
  {
    name: 'servicio-contabilidad',
    source:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=95',
    alt: 'Contabilidad y auditoría',
  },
  {
    name: 'servicio-impuestos',
    source:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=95',
    alt: 'Liquidación de impuestos',
  },
  {
    name: 'servicio-rrhh',
    source:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=95',
    alt: 'Gestión de recursos humanos',
  },
  {
    name: 'servicio-outsourcing',
    source:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=95',
    alt: 'Outsourcing administrativo',
  },
  {
    name: 'servicio-consultoria',
    source:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=95',
    alt: 'Consultoría financiera',
  },
  {
    name: 'servicio-planes',
    source:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=95',
    alt: 'Planes personalizados para empresas',
  },
  {
    name: 'recurso-monotributo',
    source:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=95',
    alt: 'Material de estudio sobre monotributo',
  },
  {
    name: 'recurso-plantilla-gastos',
    source:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=95',
    alt: 'Plantilla para control de gastos',
  },
  {
    name: 'recurso-checklist',
    source:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=95',
    alt: 'Checklist para iniciar actividades',
  },
  {
    name: 'hero-servicios',
    source:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=2400&q=95',
    alt: 'Profesionales analizando reportes contables',
  },
  {
    name: 'equipo-colaborativo',
    source:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=95',
    alt: 'Equipo de trabajo colaborando',
  },
  {
    name: 'consultor-presentando',
    source:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2400&q=95',
    alt: 'Consultor explicando estrategias',
  },
  {
    name: 'directora-estudio',
    source:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1800&q=95',
    alt: 'Retrato de Lucía Rojas, socia directora',
  },
  {
    name: 'socio-tecnologico',
    source:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=95',
    alt: 'Retrato de Martín Lem, socio tecnológico',
  },
  {
    name: 'lider-people-care',
    source:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=95',
    alt: 'Retrato de Laura Martínez, líder de people care',
  },
  {
    name: 'auditor-senior',
    source:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1800&q=95',
    alt: 'Retrato de Diego Fernández, auditor senior',
  },
  {
    name: 'blog-dashboard-oficina',
    source:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2000&q=95',
    alt: 'Oficina moderna con dashboards',
  },
  {
    name: 'blog-estadisticas-fiscales',
    source:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=2000&q=95',
    alt: 'Profesional revisando estadísticas fiscales',
  },
  {
    name: 'blog-recursos-humanos',
    source:
      'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=2000&q=95',
    alt: 'Equipo de recursos humanos colaborando',
  },
  {
    name: 'blog-dashboard-startup',
    source:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=95',
    alt: 'Dashboard financiero de startup',
  },
  {
    name: 'blog-integracion-tecnologica',
    source:
      'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=2000&q=95',
    alt: 'Integración tecnológica en oficina',
  },
  {
    name: 'blog-fundadora-resultados',
    source:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=95',
    alt: 'Fundadora analizando resultados',
  },
  {
    name: 'testimonio-ana',
    source:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=90',
    alt: 'Retrato de Ana Pérez',
    sizes: [120, 160, 240],
  },
  {
    name: 'testimonio-martin',
    source:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=90',
    alt: 'Retrato de Martín Gómez',
    sizes: [120, 160, 240],
  },
  {
    name: 'testimonio-laura',
    source:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=90',
    alt: 'Retrato de Laura Fernández',
    sizes: [120, 160, 240],
  },
  {
    name: 'case-scaling-cloud',
    source:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=90',
    alt: 'Retrato del CEO de Scaling Cloud',
    sizes: [120, 160, 240],
  },
  {
    name: 'case-casa-mia',
    source:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=90',
    alt: 'Retrato de la fundadora de Casa Mía Deco',
    sizes: [120, 160, 240],
  },
  {
    name: 'case-lex-partners',
    source:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=90',
    alt: 'Retrato del socio de Lex & Partners',
    sizes: [120, 160, 240],
  },
];

async function ensureDir(path) {
  if (!existsSync(path)) {
    await mkdir(path, { recursive: true });
  }
}

async function downloadBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.arrayBuffer();
}

async function processImage(image) {
  const { name, source, alt } = image;
  const imageDir = resolve(OUTPUT_DIR, name);
  await ensureDir(imageDir);

  const buffer = Buffer.from(await downloadBuffer(source));
  const baseSharp = sharp(buffer);
  const metadata = await baseSharp.metadata();

  const record = {
    alt,
    width: metadata.width,
    height: metadata.height,
    formats: {},
  };

  const targetSizes = image.sizes ?? DEFAULT_SIZES;

  for (const format of FORMATS) {
    const entries = [];
    for (const size of targetSizes) {
      const targetName = `${name}-${size}.${format.ext}`;
      const targetPath = resolve(imageDir, targetName);
      const pipeline = sharp(buffer).resize({ width: size, withoutEnlargement: true });

      switch (format.ext) {
        case 'avif':
          pipeline.avif(format.options);
          break;
        case 'webp':
          pipeline.webp(format.options);
          break;
        case 'jpg':
          pipeline.jpeg(format.options);
          break;
        default:
          break;
      }

      const result = await pipeline.toBuffer();
      await writeFile(targetPath, result);

      const computedWidth = Math.min(size, metadata.width ?? size);
      const computedHeight = Math.round((computedWidth / (metadata.width ?? computedWidth)) * (metadata.height ?? computedWidth));
      entries.push({
        src: `/img/generated/${name}/${targetName}`,
        width: computedWidth,
        height: computedHeight,
      });
    }

    record.formats[format.ext] = entries;
  }

  return [name, record];
}

async function main() {
  console.time('generate-images');
  await ensureDir(OUTPUT_DIR);
  await ensureDir(dirname(MANIFEST_PATH));

  const manifestEntries = await Promise.all(IMAGES.map(processImage));
  const manifest = Object.fromEntries(manifestEntries);
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.timeEnd('generate-images');
  console.log(`Generated ${manifestEntries.length} image sets in ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
