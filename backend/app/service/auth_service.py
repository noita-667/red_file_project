def verify_credentials(email: str, password: str):
    if email == "admin" and password == "1234":
        return True
    return False
