function ProfilePage() {

    const email = localStorage.getItem("email");

    const username = localStorage.getItem("username");

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body text-center">

                    <img

                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

                        width="120"

                        alt="profile"

                    />

                    <h2 className="mt-3">

                        {username || "Guest User"}

                    </h2>

                    <h4 className="text-muted">

                        {email || "No Email"}

                    </h4>

                </div>

            </div>

        </div>

    );

}

export default ProfilePage;