import styles from './CategoryBadge.module.css';
type CategoryBadgeProps = {
  category: string;
};

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const getCategoryClassName = (category: string): string => {
    const categoryClasses: { [key: string]: string } = {
      Work: styles.work,
      Personal: styles.personal,
      Home: styles.home,
      Health: styles.health,
      Finance: styles.finance,
      Shopping: styles.shopping,
      Family: styles.family,
      Social: styles.social,
      Learning: styles.learning,
      Errands: styles.errands,
      Priority: styles.priority,
      'Weekly Goals': styles.weeklyGoals,
      Projects: styles.projects,
      Creative: styles.creative,
      Admin: styles.admin,
      Travel: styles.travel,
      Goals: styles.goals,
      'Follow-Up': styles.followUp,
      Review: styles.review,
      Miscellaneous: styles.miscellaneous,
    };

    return `${styles.badge} ${categoryClasses[category] || styles.default}`;
  };

  return <span className={getCategoryClassName(category)}>{category}</span>;
};

export default CategoryBadge;
