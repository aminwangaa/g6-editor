import React from 'react';
import { inject as _inject, MobXProviderContext, observer as _observer } from 'mobx-react';

export function inject(...args) {
  return componentClass => _inject(...args)(_observer(componentClass));
}

export function observer(target) {
  return _observer(target);
}

export function useStores() {
  return React.useContext(MobXProviderContext);
}
