def verify_credentials(email: str, password: str):
    # Simple login pour tests
    if email == "admin" and password == "1234":
        return True
    return False
