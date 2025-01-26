// 默认的UI提供者
const defaultProvider = {
  showMessage: (options) => {
    console.warn('[TKRequest]: 未配置消息提示器，消息内容:', options.message);
  },
  showLoading: () => {
    console.warn('[TKRequest]: 未配置加载提示器');
    return { close: () => {} };
  }
};

// UI提供者实例
let uiProvider = defaultProvider;

// 配置UI提供者
export function configureUI(provider) {
  if (!provider) return;
  
  uiProvider = {
    showMessage: provider.showMessage || defaultProvider.showMessage,
    showLoading: provider.showLoading || defaultProvider.showLoading
  };
}

export function showMessage(options) {
  return uiProvider.showMessage(options);
}

export function showLoading(options) {
  return uiProvider.showLoading(options);
} 