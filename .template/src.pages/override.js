const override = (args) => {
  return {
    ...args,
    templateDirName: overrideTemplateDirName(args),
  }
}

export default override;

/**
 * plop で入力された コンポーネント名(name) が大文字を含む場合、<br>
 * `src.components`テンプレート を基にファイルを生成する。
 * 
 * また、`_layout` であった場合、<br>
 * `src.pages.._layout`テンプレート を基にファイルを生成する。
 */
const overrideTemplateDirName = ({
  name,
  templateDirName
}) => {
  if (name.match(/[A-Z]/)) {
    const overrided = "src.components";
    console.log(`ファイル名に大文字が含まれるため、"${overrided}" を用いてファイルを生成します。`);
    return overrided;
  } else if (name === "_layout") {
    const overrided = "src.pages.._layout";
    console.log(`"${overrided}" を用いてファイルを生成します。`);
    return overrided;
  } else {
    return templateDirName;
  }
}
