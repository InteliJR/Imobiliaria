import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Missão',
    Svg: require('../../../static/img/mission.svg').default,
    description: (
      <>
        Transformar processos empresariais por meio do digital.
      </>
    ),
  },
  {
    title: 'Visão',
    Svg: require('../../../static/img/vision.svg').default,
    description: (
      <>
        Nos tornarmos referência em tecnologia nos primeiros 5 anos da empresa.
      </>
    ),
  },
  {
    title: 'Valores',
    Svg: require('../../../static/img/values.svg').default,
    description: (
      <>
        Inovação, protagonismo, paixão por tecnologia, responsabilidade.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
