export const ACCORDION_PANELS = [
  {
    title: 'What is Neo Masterpiece Films?',
    content:
      'Neo Masterpiece Films is a production company that will leverage Blockchain technology as a disruptive tool to forever change filmmaking by providing everyone with actual value, usefulness, and ownership. We will construct a community that will prove to be vital to the film industry moving forward.',
  },
  { title: 'Why should I join NEO?',
    content3: 'We are providing formulaic processes to all of our holders that have been proven and used for decades in the film industry.', content2: 'To keep it plainly. we are making normal people Executive Producers.' },
  { title: 'How can I be a part of the filmmaking process?', content: 'Holding a founder NFT gives you rights in our discord to vote on pivotal decisions that our company must make ie. Casting, what films to produce next, exclusive access, etc.' },
  { title: 'What is your experience in the film industry?', content: 'Our team has over two decades of experience in the film industry. Our team has experience working on projects currently on Freeform, Hulu, and Amazon Prime. Most recently awarded multiple accolades from San Francisco Indie film festival, Los Angeles International Film Festival, and many more. Our Team has one decade of experience in marketing and application development along with a heightened emphasis on Web3 Technologies, NFTs, and blockchain development. Technologies including Binance, Solana, Node.js, AWS, Flutter ..etc' },
  { title: 'Can a movie make zero dollars?', content: 'It is possible for a film to “flop” but we have created avenues to ensure that no matter what our projects make money. Theatrical release is always goal number one, but if this doesn’t happen, we have resources and agents to sell the project to multiple streaming platforms.' },
  { title: 'Can I Pitch a movie to NEO?',
    content: (
      <>
        Totally! Our goal is to put the power of filmmaking in your hands. This is one of our
        mission statements. So if you think you have a great idea -
        <strong onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          localStorage.setItem('scrollToForm', true); // Set flag in localStorage
          if (window.location.pathname !== '/') {
            // Navigate to the homepage
            window.location.href = '/';
          } else {
            // Scroll to the form container if already on the homepage
            const formElement = document.getElementById('test-form-container');
            if (formElement) {
              formElement.scrollIntoView({ behavior: 'smooth' });
              formElement.focus();
            }
          }
        }}>submit a ticket</strong>
        – we think it is a viable idea.. the next step we ask is for you to create a pitch deck
        that will be presented to the founders for a vote and then presented to the community for
        the final say.
      </>
    ),
  },
  { title: 'How Are Film Rewards Shared?',
    content4: 'We are an established film studio and rewards are shared by ALL of our holders.',
      content2:'We have specific reward-building vehicles that will be provided to all holders in our film projects.' ,
      content3:'We also provide airdrops to our Founder’s Pass holders from royalties collected from the trading of our NFTs.' },
  { title: 'Can I trade my NFT? Or should I hold?', content: 'All holders can trade their NFTs, but if you do, you miss out on the amazing benefits of holding, like exclusive access and special airdrops.' },
  { title: 'What blockchain is Neo Masterpiece Films on?', content: 'We are built on the Polygon blockchain.' },
];
