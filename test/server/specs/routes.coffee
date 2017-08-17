OK = null
okStatus = (status, contentType) -> (check) ->
  PAGE TEST.title, { status,contentType }, (resp) ->
    if check?
      expect(resp).inc(check)
    DONE()


module.exports = ->


  DESCRIBE "200 Static", ->
    IT "/favicon.ico", -> okStatus(200, /image/)()
    IT "/robots.txt", -> okStatus(200, /text\/plain/)()
    IT "/sitemap.xml", -> okStatus(200, /application\/xml/)()


  DESCRIBE "200 Empty", ->

    before -> OK = okStatus 200, /text\/html/

    IT "/index.php", -> OK()
    IT "/wp-json/wp/v2/users/", -> OK()
    IT "/wp-includes/wlwmanifest.xml", -> OK()


  DESCRIBE "410", ->

    before -> OK = okStatus 410, /text\/plain/

    IT "/Certificate", -> OK()
    IT "/images/climbing-partner.png", -> OK()
    IT "/moderators-project", -> OK()
    IT "/page-not-found.htm", -> OK()
    IT "/post/e0adf3b8-88b3-4f74-8f28-631566924dd4", -> OK()


  DESCRIBE "302", ->

    before -> OK = okStatus 302, /text\/plain/

    IT "/glossary", -> OK()
    IT "/climbing-partners", -> OK()
    IT "/partners", -> OK()
    IT "/world-rock-climbing-database", -> OK()
    IT "/-world-rock-climbing-map", -> OK()


  DESCRIBE "301 (SEO)", ->

    before -> OK = okStatus 301, /text\/plain/

    IT "/CFFeed/NewPostPlace", -> OK()
    IT "/ClimberProfiles/Me", -> OK()
    IT "/clubs", -> OK()


  DESCRIBE "301 (Rewrites)", ->

    before -> OK = okStatus 301, /text\/plain/

    IT "/%20", -> OK /Redirecting to \/$/
    IT "/%20%20%20", -> OK /Redirecting to \/$/
    IT "/apple-icon-32x32-precomposed.png", -> OK "Redirecting to /apple-icon-32x32.png"
    IT "/apple-icon-120x120-precomposed.png", -> OK "Redirecting to /apple-icon-120x120.png"
