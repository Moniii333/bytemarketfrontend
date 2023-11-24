import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Contact() {

  return(
    <div className="app">
      <div id="component">
      <h1>Contact our team!</h1>
      <div>
        Monique Avila
        <br></br>
        <Link href='emailto:monique.codes@icloud.com'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</Link>
        <br></br>
        <Link href='https://github.com/Moniii333'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</Link>
        <br></br>
        <Link href='www.linkedin.com/in/moniqueavila92'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</Link>
      </div>
      <div>
        Garren Pho
        <br></br>
        <Link href='emailto:'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</Link>
        <br></br>
        <Link href='https://github.com/'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</Link>
        <br></br>
        <Link href='www.linkedin.com/'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</Link>
      </div>
      <div>
        Jonathan Netterstrom
        <br></br>
        <Link href='emailto:Netterstrom2000@gmail.com'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</Link>
        <br></br>
        <Link href='https://github.com/jnett93'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</Link>
        <br></br>
        <Link href='www.linkedin.com/in/jonathan-netterstrom/'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</Link>
      </div>
      <div>
        Rachel Watkins
        <br></br>
        <Link href='emailto:rachelwatkinsokc@gmail.com'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</Link>
        <br></br>
        <Link href='https://github.com/rachel-watkins'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</Link>
        <br></br>
        <Link href='www.linkedin.com/rachelwatkins'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</Link>
      </div>
    </div>
    </div>
  )
}