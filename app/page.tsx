"use client";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import ProjectManager from "../components/ProjectManager";
import "../lib/amplify";

export default function HomePage() {
  return (
    <Authenticator loginMechanisms={["email"]} signUpAttributes={["email"]}>
      {({ signOut, user }) => (
        <main>
          <div className="container" style={{ paddingBottom: 0 }}>
            <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>Usuário:</strong> {user?.signInDetails?.loginId}
              </div>
              <Button onClick={signOut}>Sair</Button>
            </div>
          </div>
          <ProjectManager />
        </main>
      )}
    </Authenticator>
  );
}
