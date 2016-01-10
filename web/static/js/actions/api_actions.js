 import jQuery from 'jquery'

export default function apiAjax(options={}) {
  //Required
  const action = options.action
  const url = options.url

  //Optional
  const HTTPVerb = options.verb || "GET"
  const params = options.params
  const success = options.success
  const error = options.error

  return function(dispatch) {
    dispatch({
      type: action + "_PENDING"
    })
    jQuery.ajax({
      url: url,
      type: HTTPVerb,
      data: params,
      dataType: "json"
    }).done( (data) => {
      if(success) {
        success.call(this, dispatch, data)
      } else {
        dispatch({
          type: action + "_DONE",
          data: data
        })
      }
    }).error( (xhr) => {

      var data = { errors: "unknown" };

      try {
        if(xhr.responseJSON) data = xhr.responseJSON
      } catch(error) {}

      if(error) {
        success.call(this, dispatch, data)
      } else {
        dispatch({
          type: action + "_FAILED",
          data: data
        })
      }
    })
  }
}