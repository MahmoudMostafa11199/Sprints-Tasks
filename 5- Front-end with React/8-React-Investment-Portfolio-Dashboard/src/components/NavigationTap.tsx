type Props = {
  activeTab: string;
  onTabChange: (newActive: string) => void;
};

function NavigationTap({ activeTab, onTabChange }: Props) {
  const tabs = ['overview', 'chart', 'simulation'];

  const changeUINavActive = (tab: string) => {
    return tab === activeTab
      ? 'border-blue-400 text-blue-600'
      : 'border-transparent';
  };

  return (
    <nav className="py-10">
      <ul className="flex gap-8 border-b-2 border-gray-300">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`-mb-[1.8px] border-b-2 pb-2 cursor-pointer capitalize ${changeUINavActive(
              tab
            )}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default NavigationTap;

/*
<nav className="py-10">
  <ul className="flex gap-8 border-b-2 border-gray-300">
    <li
      className={`-mb-[1.8px] border-b-2 pb-2 ${changeUINavActive(
        'overview'
      )}`}
      onClick={() => handleNavClick('overview')}
    >
      Overview
    </li>
    <li
      className={`-mb-[1.8px] border-b-2 pb-2 ${changeUINavActive(
        'charts'
      )}`}
      onClick={() => handleNavClick('charts')}
    >
      Charts
    </li>
    <li
      className={`-mb-[1.8px] border-b-2 pb-2 ${changeUINavActive(
        'simulation'
      )}`}
      onClick={() => handleNavClick('simulation')}
    >
      Simulation
    </li>
  </ul>
</nav>
*/
