import maestroCard from '../../assets/images/maestro.png';
import oswald from '../../assets/images/oswald-card.png';
import burdenGuilt from '../../assets/images/burder-g-card.png';
import heroes from '../../assets/images/heroes-am-us-card.png';
import maestroPoster from '../../assets/images/maestro-poster.jpg';
import oswaldPoster from '../../assets/images/oswald-poster.jpg';
import guilt from '../../assets/images/burden-of-guilt-poster.jpg';
import heroesPoster from '../../assets/images/heroes-poster.jpg';

export const FILM_CARDS = [
  {
    img: maestroCard,
    roles: '6',
    title: 'the maestro',
    date: 'To be announced',
    backgroundStatic: '#151515',
    backgroundHover: '#1F1F1F',
    buttonText: 'Details',
    backgroundImg: maestroPoster,
    path: '/maestro-page',
    // starring: ['Floyd Miles', 'Kristin Watson', 'Esther Howard'],
    // createdBy: ['Marvin McKinney'],
    writtenBy: [' '],
    movieDes:
      ' A psychiatrist evaluates a case involving a potentially psychotic patient and a mysterious figure in the shadows that likens back to his past.',
    filmAbout: ' A 10-minute thriller/horror/mystery film written and directed by Andre Machado.',
    producer: 'Muting Li',
    audition_dates: 'Eco Cast Self-Tape',
    rates: '$125/day',
    director: 'Andre Machado',
    production: 'Student Film, ArtCenter College of Design, NON-UNION',
    actor: {
      actor_name: 'Adrian Benowitz',
      bio: '18 to 22 years old, all ethnicities man. The Captain of the football team, haunted by a story he heard from an Old Woman on the Subway. Accused of a terrible crime. His mental breakdown set the events of the story into motion. SUPPORTING',
    },
  },
  {
    img: oswald,
    roles: '3',
    title: 'Oswald',
    date: 'To be announced',
    backgroundStatic: '#151515',
    backgroundHover: '#1F1F1F',
    buttonText: 'Details',
    backgroundImg: oswaldPoster,
    path: '/oswald-page',
    // starring: [' ', '', ''],
    directedBy: [''],
    createdBy: ['Lilton Stewart III'],
    writtenBy: ['Lilton Stewart III'],
    movieDes:
      'Velit ac tincidunt neque pulvinar mauris fames ornare sit magna. Turpis in neque sed magnis nunc. Mattis metus neque volutpat nunc.',
    filmAbout: ' A 10-minute thriller/horror/mystery film written and directed by Andre Machado.',
    castDetails: {
      producer: 'Muting Li',
      audition_dates: 'Muting Li',
      rates: 'Muting Li',
      director: 'Muting Li',
    },
    production: 'Cinema University',
    actor: {
      actor_name: 'Mrs Benowitz/' + ' Mrs Mckinsey',
      bio:
        '30 to 50 years old, all ethnicities woman. A traditional, Christian American mom. The victim of a terrible crime. DAY ' +
        'PLAYER',
    },
  },
  {
    img: burdenGuilt,
    roles: '5',
    title: 'Burden Of Guilt',
    date: 'To be announced',
    backgroundStatic: '#151515',
    backgroundHover: '#1F1F1F',
    buttonText: 'Details',
    backgroundImg: guilt,
    path: '/burdenGuilt-page',
    starring: ['Teala Stampley', 'Torean Thomas', 'Rosa Pill', 'Mariah Salae'],
    createdBy: [' '],
    writtenBy: [' '],
    movieDes:
      'Mauris sit urna et odio. Pharetra ut tellus velit diam pellentesque sit sollicitudin turpis nibh. Ac felis morbi et ultrices interdum tempor integer elit..',
    filmAbout: ' A 10-minute thriller/horror/mystery film written and directed by Andre Machado.',
    producer: 'Muting Li',
    audition_dates: 'Eco Cast Self-Tape',
    rates: '$125/day',
    director: 'Andre Machado',
    production: 'Cinema University',
    actor: {
      actor_name: 'Whitecoat Doctor #01 and #02',
      bio: '20 to 30 years old, all ethnicities woman, man. WEARS MASK and DOCTOR COSTUME maybe has one line. DAY PLAYER',
    },
  },
  {
    img: heroes,
    roles: '3',
    title: 'Heroes among us',
    date: 'To be announced',
    backgroundStatic: '#151515',
    backgroundHover: '#1F1F1F',
    buttonText: 'Details',
    backgroundImg: heroesPoster,
    path: '/heroes-among-us-page',
    starring: [' ', '', ''],
    createdBy: [' '],
    writtenBy: [' '],
    producer: 'Muting Li',
    audition_dates: 'Eco Cast Self-Tape',
    rates: '$125/day',
    director: 'Andre Machado',
    production: 'Cinema University',
    actor: {
      actor_name: 'The Hat-Man',
      bio: '20 to 40 years old, all ethnicities any gender. ROLE WEARS A COSTUME and has NO LINES. A FACELESS SLENDER MAN who plagues those know about his presence. Once you see him, you cannot go back. DAY PLAYER',
    },
    movieDes:
      'In the realm of cinematic prowess, emerges "Heroes Among Us," This upcoming series delves into the extraordinary journeys of three enigmatic superhero figures, each grappling with their own inner turmoil and external adversaries. As their individual narratives unfold in a labyrinth of intrigue and suspense, audiences are drawn into a riveting exploration of identity, sacrifice, and the blurred lines between heroism and humanity.',
  },
  // {
  //   img: finalshow,
  //   title: 'the final show',
  //   date: 'out now',
  //   backgroundStatic: '#151515',
  //   backgroundHover: '#1F1F1F',
  //   buttonText: 'Details',
  //   backgroundImg: noBg,
  //   path: '/finalshow-page',
  //   starring: [' ', '', ''],
  //   createdBy: ' ',
  // },
];
