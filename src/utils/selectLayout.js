export const selectLayout = (pathName) => {
    console.log('Current Path:', pathName);  // 查看路径信息
    return pathName.includes('/users') ? 'LoginLayout' : 'BaseLayout';
}
