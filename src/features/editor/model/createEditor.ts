import CodeMirror from 'codemirror'

export const createEditor = () => CodeMirror.fromTextArea(document.getElementById('ds') as HTMLTextAreaElement, {
    lineNumbers: true,
    keyMap: 'sublime',
    theme: 'material-ocean',
    mode: 'javascript',
})

export const createWidget = () => {
    const element = document.createElement('span');
    element.textContent = 'hmmm?';
    element.style.cssText =
        'background: #F37381; padding: 0px 3px; color: #F3F5F1; cursor: pointer;';
};
