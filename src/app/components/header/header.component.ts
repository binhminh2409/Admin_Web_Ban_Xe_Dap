import { Component, OnInit } from '@angular/core'; // Thêm OnInit để sử dụng lifecycle hook
import { AuthService } from '../../service/auth.service'; // Đảm bảo đường dẫn đúng

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { // Implement OnInit
  menuActiveForms: boolean = false;
  menuActiveList: boolean = false;
  isLogin: boolean = false; // Đặt giá trị mặc định cho biến isLogin
  userName: string = ''; // Đặt giá trị mặc định cho biến userName

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn();
    if (this.isLogin) {
      this.userName = this.auth.getUserNameFromToken(); // Lấy tên người dùng từ token
    }
  }

  toggleMenuForms(): void {
    this.menuActiveForms = !this.menuActiveForms; // Đảo ngược trạng thái menu
  }
  
  toggleMenuList(): void {
    this.menuActiveList = !this.menuActiveList; // Đảo ngược trạng thái menu
  }

  
}
