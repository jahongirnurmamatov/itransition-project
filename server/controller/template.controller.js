
export const createTemplate = (req, res) => {
    try {
        const { title, topic, description, image, forms, tags } = req.body;
        console.log(req.body)
        res.status(200).json({ success: true, message: "Template created successfully" });

    } catch (error) {
        console.log(error.message)
    }
}