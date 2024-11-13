import React from 'react'
import Form1 from './soft-exudates-detection/components/Form'
import Form2 from './melanoma-detection-in-dermoscopy-images/components/Form'
import Form3 from './classification-of-malignant-skin-lesions/components/Form'

const ProgramHandler = ({ name = 'soft-exudates-detection' }: { name: string }) => {
  const programs: Record<string, JSX.Element> = {
    'soft-exudates-detection': <Form1 />,
    'melanoma-detection-in-dermoscopy-images': <Form2 />,
    'classification-of-malignant-skin-lesions': <Form3 />,
  }

  return programs[name] || null
}

export default ProgramHandler
