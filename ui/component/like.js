import React  from 'react'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'


const tweet = 'https://twitter.com/intent/tweet?text=Awesome%20%40climbfind%20app%20for%20finding%20rock climbing%20partners%20%23rockclimbing%20%23belayon!  www.climbfind.com&original_referer=https://www.climbfind.com/love#tweet-intent'
// <a class="follow ion-social-tumblr" href="http://heroes.climbfind.com" target="_blank"></a>


export default function Like() { return (<>


  <h2>Thank <i className='ion-heart'></i> you!</h2>
  
  <h4>Follow</h4>
  <a className='follow' href='https://www.facebook.com/climbfind/' target='_blank' rel="noopener noreferrer">
    <FacebookIcon />
  </a>
  <a className="follow" href="https://www.twitter.com/climbfind" target="_blank" rel="noopener noreferrer">
    <TwitterIcon />
  </a>
      
  <h4>Share</h4>
  <a className="share ion-social-facebook" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=www.climbfind.com" rel="noopener noreferrer">
    <FacebookIcon /> &nbsp; Share
  </a>    
  <a className="share" target="_blank" href={tweet} rel="noopener noreferrer">
    <TwitterIcon /> &nbsp; Tweet
  </a>

  <h4>Request new gyms, press and business</h4>
  <p><b><a href='ma&#105;lto&#58;&#99;%&#54;&#70;&#37;6E&#116;&#37;61%63&#116;&#37;40&#37;63limb&#102;&#105;n%6&#52;%2E&#37;63o%6D'>co&#110;tact&#64;cl&#105;mb&#102;ind&#46;&#99;&#111;&#109;</a></b></p>

  <h4>App feedback</h4>
  <p><a href='/reply/59841c9f4e4287a2b83bea2a'>Message JK</a></p>


</>)
}
