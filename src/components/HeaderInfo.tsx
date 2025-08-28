/* eslint-disable jsx-a11y/alt-text */
import { Text, View } from '@react-pdf/renderer'
import colors from 'tailwindcss/colors'
import { colorOclToHex } from '../lib/util'
import { Image } from './Image'
import { spacing } from './styles'

export function HeaderInfo({ resume }: { resume: ResumeSchema }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: '-30',
        right: '-30',
        top: '-30',
        height: 280,
        padding: '60 60 30 60',
        backgroundColor: colorOclToHex(colors.yellow[300]),
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: '30%' }}>
        <Image resume={resume} />
      </View>

      <View style={{ marginLeft: '10%', width: '60%', gap: spacing[4] }}>
        <View style={{ gap: spacing[2] }}>
          <Text
            style={{
              fontSize: spacing[10],
              fontWeight: 'bold',
            }}
          >
            {resume.basics?.name}
          </Text>
          <Text
            style={{
              fontSize: spacing[6],
              marginBottom: 10,
            }}
          >
            {resume.basics?.label}
          </Text>
        </View>
        <Text style={{ fontSize: spacing[5] }}>{resume.basics?.summary}</Text>
      </View>
    </View>
  )
}
