import { SchoolHero } from '../SchoolHero';

export default function SchoolHeroExample() {
  const handleGetStarted = () => {
    console.log('Get started clicked');
  };
  
  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };
  
  return (
    <div>
      <SchoolHero 
        schoolName="Springfield Academy"
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
      />
    </div>
  );
}