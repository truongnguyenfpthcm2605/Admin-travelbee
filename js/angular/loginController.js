app.controller("loginController", function ($scope, $location, $http, $rootScope, $cookies) {
    $scope.login = {
        email: "",
        password: "",
    };
    $scope.rememberMe = false;
    $scope.object = {};
    $scope.submitForm = function () {
        if ($scope.formlogin.$valid) {
            $http
                .post($rootScope.url + "/api/v1/auth/login", $scope.login)
                .then((response) => {
                    $scope.object = response.data;
                    $rootScope.email = $scope.object.email;
                    $rootScope.fullname = $scope.object.fullName;
                    $rootScope.authorities = $scope.object.authorities;
                    $rootScope.token = $scope.object.token;

                    console.log("login")
                    $scope.object.authorities.forEach(e => {
                        if (e.authority === 'ADMIN' || e.authority === 'STAFF') {
                            Swal.fire({
                                title: 'Đăng Nhập Thành Công',
                                width: 600,
                                icon: 'success',
                                padding: '3em',
                                color: '#716add'
                                
                            });
                            $location.path('/main');
                        } else {
                            Swal.fire({
                                title: 'Không thể đăng nhập',
                                width: 600,
                                icon: 'warning',
                                padding: '3em',
                                color: '#716add'
                                
                            });
                        }
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng Nhập Thất Bại',
                        text: 'kiểm tra tài khoản và mật khẩu!',
                    });
                });
        }
    };


    $scope.onRememberClick = function () {
        if ($scope.rememberMe) {
            let expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1);
            $cookies.put("userInfo", JSON.stringify($scope.login), {
                expires: expirationDate,
            });
        } else {
            $cookies.remove("userInfo");
        }
    };

    $scope.restoreUserInfo = function () {
        let savedUserInfo = $cookies.get("userInfo");
        if (savedUserInfo != null) {
            $scope.login = JSON.parse(savedUserInfo);
        }
    };

    $scope.restoreUserInfo();
}
);
