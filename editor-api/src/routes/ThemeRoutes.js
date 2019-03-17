import express from 'express'
import Theme from '../models/Theme'

const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        try {
            const dbThemes = await Theme.find().exec() || []
            const themes = dbThemes.map(({ _id: id, name, thumbnail }) => ({
                id, name, thumbnail
            }))
            res.status(200).json(themes)
        } catch (err) {
            res.status(500).json({ errors: { global: err.message } })
        }
    })
    .post(async (req, res) => {
        const theme = new Theme(req.body)
        try {
            const newTheme = await theme.save()
            res.status(200).json(newTheme)
        } catch (err) {
            res.status(500).json({ errors: { global: err.message } })
        }
    })

router.route('/:themeId')
    .get(async (req, res) => {
        try {
            const theme = await Theme.findById(req.params.themeId).exec()
            if (theme === null) {
                res.status(404).json({ errors: { global: "theme not found" } })
                return
            }
            res.status(200).json(theme)
        } catch (err) {
            res.status(500).json({ error: { global: err } })
        }
    })
    .put(async (req, res) => {
        try {
            const theme = await Theme.findById(req.params.themeId).exec()
            if (theme === null) {
                res.status(404).json({ errors: { global: "theme not found" } })
                return
            }
            Object.assign(theme, req.body)
            const newTheme = await theme.save()
            res.status(200).json(newTheme)
        } catch (err) {
            if(err.name==="VersionError") {
                res.status(409).json({ error: { global: err } })
            } else {
                res.status(500).json({ error: { global: err } })
            }
        }
    })
    .delete(async (req, res) => {
        try {
            const theme = await Theme.findById(req.params.themeId).exec()
            if (theme === null) {
                res.status(404).json({ errors: { global: "theme not found" } })
                return
            }
            await Theme.deleteOne({ _id: theme._id }).exec()
            res.status(204).send()
        } catch (err) {
            res.status(500).json({ error: { global: err } })
        }
    })

export default router