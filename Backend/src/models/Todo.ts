import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TodoCategories {
  WORK = 'Work',
  PERSONAL = 'Personal',
  HOME = 'Home',
  HEALTH = 'Health',
  FINANCE = 'Finance',
  SHOPPING = 'Shopping',
  FAMILY = 'Family',
  SOCIAL = 'Social',
  LEARNING = 'Learning',
  ERRANDS = 'Errands',
  PRIORITY = 'Priority',
  WEEKLY_GOALS = 'Weekly Goals',
  PROJECTS = 'Projects',
  CREATIVE = 'Creative',
  ADMIN = 'Admin',
  TRAVEL = 'Travel',
  GOALS = 'Goals',
  FOLLOW_UP = 'Follow-Up',
  REVIEW = 'Review',
  MISCELLANEOUS = 'Miscellaneous',
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  categories: { type: TodoCategories },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
