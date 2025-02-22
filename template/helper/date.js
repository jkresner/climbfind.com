var cMap = { tr: 'Top rope', lead: 'Lead climb', boulder: 'Boulder'}

module.exports = {


  climb: style => style == 'tr' ? 'toprope' : style,


  date: post => {
    let today = moment.tz(post.tz.id).startOf('day').unix()
    if ((post.time >= today) || post.me) {
      let t = moment.unix(post.time).tz(post.tz.id)
      let climbing = ""
      for (let type of post.climbing) climbing += `<b>${cMap[type]}</b> or `
      climbing = climbing.replace(/ or $/, '')
      return `<time>${t.format('MMM')} <i class="fa fa-calendar-o" aria-hidden="true"><b>${t.format('DD')}</b></i></time> <em>${climbing} on <b>${t.format('ddd')}</b></em> `
    }
    return ''
  },


  markup: txt => marked(txt),


  ago: id => moment(honey.util.BsonId.toDate(id)).fromNow(),


  first: txt => txt.split(' ')[0],


  postcity: x => {
    var opts = Object.keys(CAL.places.area)
      .filter(id => CAL.places.area[id].linked.length > 0)
      .map(id =>
      `<option value="${id}">${CAL.places.area[id].name}</option>`)
          .join('\n')
    // $log('postcity'.green, opts, CAL.places.area)
    return `<option value=" " selected>-- select city --</option>\n${opts}`
  },

  postplaces: x => {
    return JSON.stringify({
      indoor:CAL.places.indoor,
      area:CAL.places.area
    })
  },


  postdays: x => {
    var opts = [0,1,2,3,4,5,6].map(n =>
      `<option value="${n}">${moment().add(n,'day').format('dddd, MMM Do')}</option>`)
          .join('\n')
    var select = `<select id="day" class="form-control"><option value=" " selected>-- select day --</option>\n${opts}</select>`
    var items = [0,1,2,3,4,5,6].map(n =>
      `<li data-day='${n}'><time>${moment().add(n,'day').format('<b>ddd</b> Do MMM')}</time></li>`)
          .join('\n')
    return `<ul id="days">${items}</ul>${select}`
  },


}
