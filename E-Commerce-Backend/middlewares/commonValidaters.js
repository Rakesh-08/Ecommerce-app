

let validateReqForId = async (id, model, res, next) => {
    let categoryId = id;


    if (categoryId) {
        let IsCategoryThere = await model.findByPk(categoryId)

        if (!IsCategoryThere) {
            res.status(400).send({
                message: 'Category does not exist'
            })
            return;

        }
    } else {
        res.status(400).send({
            message: 'Category id is missing'
        })
    }

    next();

}

module.exports = validateReqForId;