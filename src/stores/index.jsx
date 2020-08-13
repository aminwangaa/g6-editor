import initInterviewStore from './interview';
import initEditorStore from './editor';

export function initStore() {
  const interviewStores = initInterviewStore();
  const initEditorStores = initEditorStore();
  return {
    ...interviewStores,
    ...initEditorStores
  }
}

export const stores = initStore();


