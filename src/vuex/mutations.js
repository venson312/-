//更改用户信息
export const userStatus = (state,user) => {
  if (user) {
    state.currentUser = user;
    state.isLogin = true;
  }else if (user == '') {
    //退出登录的时候，清空sessionstorage里的东西
    sessionStorage.setItem('userId','');
    // sessionStorage.setItem('userTaken',"");
    state.currentUser = '';
    state.isLogin = false;
    // state.taken = "";
  }
}
