# Installation du backend

cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve


# Installation du frontend

cd frontend
npm install
npm run dev


