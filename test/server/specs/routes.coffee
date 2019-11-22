OK = null
okStatus = (status, contentType) -> (check) ->
  PAGE TEST.title, { status,contentType }, (resp) ->
    if check?
      expect(resp).inc(check)
    DONE()


module.exports = ->


  DESCRIBE "200 Static", ->
    IT "/favicon.ico", -> okStatus(200, /image/)()
    IT "/robots.txt", -> okStatus(200, /text\/plain/)("Disallow: /media/")
    IT "/sitemap.xml", -> okStatus(200, /application\/xml/)()


  DESCRIBE "200 Empty", ->

    before -> OK = okStatus 200, /text\/html/

    IT "/Admin", -> OK()
    IT "/administrator/", -> OK()
    IT "/adm/ltld", -> OK()
    IT "/_admin/", -> OK()
    IT "/CMS", -> OK()
    IT "/cms/admin", -> OK()
    IT "/.env", -> OK()    
    IT "/index.php", -> OK()
    IT "/Login/To%20view%20a%20profile", -> OK()
    IT "/wp-json/wp/v2/users/", -> OK()
    IT "/wp-includes/wlwmanifest.xml", -> OK()
    IT "/rutss96954.txt", -> OK()
    IT "/indoor-climb%E2%80%A6", -> OK()


  DESCRIBE "403", ->

    IT "[HEAD] /", ->
      PAGE "/", { status:403, method: 'head' }, (resp) ->
        expect(resp).to.be.undefined
        DONE()


  DESCRIBE "410", ->

    before -> OK = okStatus 410, /text\/plain/

    IT "/assets/modules/evogallery/js/uploadify/uploadify.css", -> OK()
    IT "/Certificate", -> OK()
    IT "/images/climbing-partner.png", -> OK()
    IT "/moderators-project", -> OK()
    IT "/page-not-found.htm", -> OK()
    IT "/post/e0adf3b8-88b3-4f74-8f28-631566924dd4", -> OK()
    IT "/Posts/DeleteComment/", -> OK()


  DESCRIBE "302", ->

    before -> OK = okStatus 302, /text\/plain/

    IT "/glossary", -> OK()
    IT "/climbing-partners", -> OK()
    IT "/partners", -> OK()
    IT "/people-looking-for-climbing-partners/london-united-kingdom/westway-sports-centre", -> OK()
    IT "/world-rock-climbing-database", -> OK()
    IT "/-world-rock-climbing-map", -> OK()


  DESCRIBE "301 (SEO)", ->

    before -> OK = okStatus 301, /text\/plain/

    IT "/CFFeed/NewPostPlace", -> OK()
    IT "/ClimberProfiles/Me", -> OK()
    IT "/clubs", -> OK()
    IT "/join", -> OK()
    IT "/Media/Detail/76515b72-7129-4b95-a45b-fc3380fcbadf", -> OK()
    IT "/Media/OpinionNew", -> OK()
    IT "/rock-climbing-social-network", -> OK()


  DESCRIBE "301 (Rewrites)", ->

    before -> OK = okStatus 301, /text\/plain/

    IT "/%0D", -> OK /Redirecting to \/$/
    IT "/%20", -> OK /Redirecting to \/$/
    IT "/%20%20%20", -> OK /Redirecting to \/$/
    IT "/apple-icon-32x32-precomposed.png", -> OK "Redirecting to /apple-icon-32x32.png"
    IT "/apple-icon-120x120-precomposed.png", -> OK "Redirecting to /apple-icon-120x120.png"
