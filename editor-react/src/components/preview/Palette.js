import React from 'react'
import SectionHeader from './SectionHeader'
import ColorEntry, { PaletteGrid } from './ColorEntry'

const Palette = ({ palette , onClickPalette, theme }) => (
    <div>
        <SectionHeader size>Colors Palette</SectionHeader>
        <PaletteGrid>
            {palette && palette.map(({ color, name }, idx) => (
                <ColorEntry key={name} color={color} name={name} onClick={() => onClickPalette(idx)} theme={theme} />
            ))}
        </PaletteGrid>
    </div>
)

export default Palette