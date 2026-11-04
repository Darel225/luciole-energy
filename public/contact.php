<?php
// =========================================================================
// SCRIPT DE TRAITEMENT DU FORMULAIRE DE CONTACT & DEVIS - LUCIOLE ENERGY
// =========================================================================

// 1. En-têtes CORS (Permet au frontend React d'appeler ce script sans blocage)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Réponse immédiate pour la requête préliminaire (preflight) du navigateur
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Autoriser uniquement les requêtes POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée."]);
    exit;
}

// 2. Récupération des données (supporte le JSON de fetch() et le $_POST standard)
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Protection anti-spam : si le champ pot de miel (honeypot) est rempli par un robot
if (!empty($data["website"])) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Demande traitée avec succès."]);
    exit;
}

// 3. Récupération et assainissement des champs Luciole Energy
$nom         = htmlspecialchars(strip_tags(trim($data["name"] ?? $data["nom"] ?? $data["Nom"] ?? '')));
$entreprise  = htmlspecialchars(strip_tags(trim($data["company"] ?? $data["entreprise"] ?? $data["Entreprise"] ?? '')));
$email       = filter_var(trim($data["email"] ?? $data["Email"] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone   = htmlspecialchars(strip_tags(trim($data["phone"] ?? $data["telephone"] ?? $data["Telephone"] ?? '')));
$service     = htmlspecialchars(strip_tags(trim($data["service"] ?? $data["Service"] ?? 'Non spécifié')));
$details     = htmlspecialchars(strip_tags(trim($data["details"] ?? $data["message"] ?? $data["Message"] ?? 'Aucun détail particulier.')));

// 4. Validations obligatoires
if (empty($nom)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez renseigner votre nom complet."]);
    exit;
}

if (empty($entreprise)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez renseigner votre entreprise."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Format d'adresse e-mail invalide."]);
    exit;
}

if (empty($telephone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez renseigner votre numéro de téléphone."]);
    exit;
}

// 5. Configuration de l'expédition
$destinataire = "info@luciole-energy.com";
$sujet = "[Devis B2B] " . $service . " - " . $entreprise . " (" . $nom . ")";

// 6. Construction du corps de l'email
$dateEnvoi = date("d/m/Y à H:i");

$contenu = "=======================================================\n";
$contenu .= " NOUVELLE DEMANDE DE DEVIS & ÉTUDE B2B - LUCIOLE ENERGY\n";
$contenu .= " Reçue le : " . $dateEnvoi . "\n";
$contenu .= "=======================================================\n\n";

$contenu .= "--- 👤 INTERLOCUTEUR & ENTREPRISE ---\n";
$contenu .= "• Nom complet   : " . $nom . "\n";
$contenu .= "• Entreprise    : " . $entreprise . "\n";
$contenu .= "• Email pro     : " . $email . "\n";
$contenu .= "• Téléphone     : " . $telephone . "\n\n";

$contenu .= "--- ⚡ PÔLE TECHNIQUE CONCERNÉ ---\n";
$contenu .= "• Domaine visé  : " . $service . "\n\n";

$contenu .= "--- 📝 DÉTAILS DU PROJET / CAHIER DES CHARGES ---\n";
$contenu .= $details . "\n\n";

$contenu .= "=======================================================\n";
$contenu .= "Ce message a été transmis depuis le site www.luciole-energy.com\n";

// 7. En-têtes sécurisés
$headers = "From: Luciole Energy Web <noreply@luciole-energy.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 8. Envoi de l'email
if (@mail($destinataire, $sujet, $contenu, $headers)) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Votre demande a été envoyée avec succès. Un ingénieur d'affaires vous recontactera sous 48 heures ouvrées."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Une erreur technique est survenue lors de l'envoi. Veuillez nous contacter directement au +225 07 07 23 73 53."
    ]);
}
?>
