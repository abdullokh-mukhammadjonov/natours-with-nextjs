import AppError from 'api-lib/utils/appError'
import APIFeatures from 'api-lib/utils/apiFeatures'

const deleteOne = Model =>
  async (req, res, next) => {
    let id = req?.params?.id
    
    if(!id) id = req?.query?.id

    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  }

const updateOne = (Model, send_as) =>
  async (req, res, next) => {
    let id = req?.params?.id
    
    if(!id) id = req?.query?.id

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      [send_as]: doc
    });
  }

const createOne = (Model, send_as) =>
  async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      [send_as]: doc
    });
  }

const getOne = (Model, send_as, popOptions) =>
  async (req, res, next) => {
    let id = req?.query?.id
    
    if(!id) id = req?.params?.id

    if(!id) {
      return next(new AppError('No ID found', 404));
    }
    
    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      [send_as]: doc
    });
  }

const getAll = (Model, send_as) =>
  async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params && req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      [send_as]: doc
    });
  }

// deleteOne = (Model) =>
// updateOne = (Model, send_as) =>
// createOne = (Model, send_as) =>
// getAll =    (Model, send_as) =>
// getOne =    (Model, send_as, popOptions) =>
export default {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
}