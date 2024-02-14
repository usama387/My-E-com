import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemas';
import StudioHeader from '@/components/StudioHeader';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath : '/studio',
  name: 'OREBI_USAMA',
  title: 'orebi online shopping',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  // My custom component
  studio:{
    components:{
      navbar:StudioHeader,
    }
  }
})
