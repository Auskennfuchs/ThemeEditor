import mongoose from 'mongoose'

const PaletteEntry = {
    name: { type: String, required: true },
    color: { type: String, required: true },
}

const ThemeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    palette: [PaletteEntry],
    links: { type: Object },
    theme: { type: Object },
    thumbnail: { type: String },
})

export default mongoose.model("Theme", ThemeSchema)