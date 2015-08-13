import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import rest from '../api/rest.js';
import SlidersStore from '../stores/SlidersStore';
import vow from 'vow'

export default {
  loadSliders(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_LOAD_SLIDERS
    })

    return rest.getSliders(id).then(function(response) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_LOAD_SLIDERS,
        sliders: response.data
      });
    })
  },

  addSlider(data, form) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_ADD_SLIDER
    })

    rest.addSlider(data).then(function(response) {
      rest.upload('slider', response.data.id, 'slide', form).then(function(response) {
        Dispatcher.handleServerAction({
          type: Constants.ActionTypes.SUCCESS_ADD_SLIDER,
          slider: response.data
        })

        def.resolve()
      })
    })

    return def.promise()
  },

  editSlider(id, data, form) {
    var def = vow.defer()

    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_EDIT_SLIDER
    })

    var defArr = []

    data.slides.forEach(function(item) {
      if (!item.delete)
        return

      let def = vow.defer()
      defArr.push(def.promise())

      rest.removeUpload('slider', id, 'slide', item.id).then(function(response) {
        def.resolve(response)
      })
    })

    defArr.push(rest.upload('slider', id, 'slide', form))
    defArr.push(rest.editSlider(id, data))

    vow.all(defArr).then(function(all) {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_EDIT_SLIDER,
        slider: all[all.length - 1].data
      });

      def.resolve()
    })

    return def.promise()
  },

  deleteSlider(id) {
    Dispatcher.handleServerAction({
      type: Constants.ActionTypes.START_DELETE_SLIDER
    })

    return rest.deleteSlider(id).then(function() {
      Dispatcher.handleServerAction({
        type: Constants.ActionTypes.SUCCESS_DELETE_SLIDER,
        id: id
      });
    })
  },
};
