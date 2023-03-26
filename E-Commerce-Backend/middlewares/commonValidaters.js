let validateReqForName = (req, res, next, msgFor) => {
    if (!req.body.name) {
        res.status(400).send({
            message: msgFor + " name is required"
        })
        return;
    }
    next();

}

let validateReqForId = async (id, model, res, next, msgFor) => {
    let categoryId = id;


    if (categoryId) {
        let IsCategoryThere = await model.findByPk(categoryId)

        if (!IsCategoryThere) {
            res.status(400).send({
                message: msgFor + " does not exist"
            })
            return;

        }
    } else {
        res.status(400).send({
            message: msgFor + ' id is missing'
        })
    }

    next();

}

module.exports = { validateReqForId, validateReqForName, }