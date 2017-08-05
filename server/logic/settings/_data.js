const Views = {

}

const Query = {
  missing: { 'settings': { $exists: false } },
}

const Opts = {
  userSettings: { select: '_id settings' }
}

const Projections = ({select}, {view,chain}) => ({


  defaults: d => assign(d, { notify: {
    messages: { email: true, push: false },
    weekly: { email: true, push: false, day: moment().isoWeekday() }
  }}),


  account: d => {
    var {messages,weekly} = d.notify
    d.notify.messages.email = messages.email ? "on" : "off"
    d.notify.messages.push = messages.push ? "on" : "off"
    d.notify.weekly.email = weekly.email ? "on" : "off"
    d.notify.weekly.push = weekly.push ? "on" : "off"
    return d
  }


})

module.exports = { Views, Query, Opts, Projections }
