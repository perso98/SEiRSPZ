# **System Ewidencji i Rozliczenia Studenckich Praktyk Zawodowych**  

Niniejsza praca dyplomowa miała na celu stworzenie aplikacji do nadzorowania przebiegu praktyk studenckich oraz wspierania tworzenia dokumentacji praktyk. Aplikacja jest przeznaczona dla:  
✔ **Praktykantów** – opisujących codzienne aktywności w elektronicznym dzienniku praktyk,  
✔ **Opiekunów zakładowych** – akceptujących wpisy praktykantów w dzienniku,  
✔ **Opiekunów uczelnianych** – weryfikujących osiągnięcie efektów uczenia się,  
✔ **Pracowników dziekanatu oraz zarządu instytutu** – organizujących praktyki poprzez przydzielanie miejsc pracy i opiekunów dla praktykantów.  

Aplikacja oferuje szereg dodatkowych funkcji wspierających organizację i dokumentację praktyk.  

---

## **Zakres prac Macieja Sierżęgi (perso98) obejmował:**  

✔ **Stworzenie systemu logowania i rejestracji**  
✔ **Tworzenie sesji użytkownika i zabezpieczenie dostępu**  
✔ **Możliwość edycji konta użytkownika (zmiana hasła)**  
✔ **Funkcjonalności dla różnych profili użytkowników:**  
   - **Administrator**  
   - **Opiekun zakładowy**  
   - **Opiekun uczelniany**  

---

## **📌 Opis funkcjonalności**  

🔹 **System logowania i rejestracji** umożliwia użytkownikowi utworzenie własnego konta i logowanie do aplikacji.  
🔹 **Sesje użytkownika i zabezpieczenie dostępu** chronią aplikację przed nieautoryzowanym dostępem.  
🔹 **Edycja konta** pozwala użytkownikowi zmienić swoje hasło.  

🔹 **Profil administratora** umożliwia:  
✔ Przypisywanie ról użytkownikom  
✔ Zmianę danych logowania użytkowników  
✔ Tworzenie oraz usuwanie kont użytkowników  

🔹 **Profil opiekuna zakładowego i uczelnianego** umożliwia:  
✔ Ocenę dni z dziennika praktyk przypisanych studentów  
✔ Akceptację lub odrzucenie wpisów  
✔ Edytowanie opisu dnia  
✔ Dodawanie komentarzy  

---

## **📌 Uruchamianie projektu**  

```bash
cd client
npm start
cd ..
cd server
node server
```

## Pierwszą stroną przed zalogowaniem do aplikacji jest strona główna. Znajdują się na niej informację do czego jest przeznaczona, które mają naświetlić zalety korzystania z tej aplikacji.

![image](https://user-images.githubusercontent.com/72854881/217893276-8e2e8620-a2cd-4c29-9e74-f29c4178acb6.png)

Po zalogowaniu wygląd strony głównej zmieniany jest na powitanie użytkownika oraz nakierowanie go na możliwości odpowiednich dla jego roli do których może przystąpić jest to wygląd strony ze wszystkimi rolami.

![image](https://user-images.githubusercontent.com/72854881/217893428-42be015c-8b3a-4356-8feb-ec7be0679b7a.png)

Wygląd strony dla użytkownika z rolą ‘student’.

![image](https://user-images.githubusercontent.com/72854881/217893627-0eda11be-9d8e-4f44-bfad-88889a140e9f.png)

Aby móc korzystać z funkcji aplikacji, każdy użytkownik musi się zalogować na konto poprzez formularz logowania.

![image](https://user-images.githubusercontent.com/72854881/217894119-c570f4f4-f0d8-4ca0-967a-87557b069556.png)

![image](https://user-images.githubusercontent.com/72854881/217894167-c52c767a-60a8-4a0d-8f67-312ea2c2196f.png)

Po pomyślnym zalogowaniu zmienia się górny pasek nawigacyjny, a także pojawia się boczny pasek, który pozwala na nawigację zależną od ról zalogowanego użytkownika.

Przed zalogowaniem

![image](https://user-images.githubusercontent.com/72854881/217894266-82acf69c-b14f-4c25-b569-0d5d858efa2f.png)

Po zalogowaniu

![image](https://user-images.githubusercontent.com/72854881/217894326-63f18442-df86-45e4-8583-3e73be1c8c24.png)

Pasek boczny po zalogowaniu ze wszystkimi rolami.

![image](https://user-images.githubusercontent.com/72854881/217894400-cc2d3b44-3c2e-42b9-bad7-521d71d28054.png)

Aby zalogować się do aplikacji, użytkownik musi utworzyć konto używając formularz rejestracji.

![image](https://user-images.githubusercontent.com/72854881/217894600-8e1d53bb-a283-4647-9d8d-14677af9ea47.png)

Poniżej informacje o błędach rejestracji.

![image](https://user-images.githubusercontent.com/72854881/217894651-faf25017-fdf6-450c-87a7-cc79d1d42902.png)

![image](https://user-images.githubusercontent.com/72854881/217894681-ef0ded40-7311-40e6-9b02-a38a1d4421fa.png)\

Poniżej informacje o pomyślnej rejestracji

![image](https://user-images.githubusercontent.com/72854881/217894851-242bc581-3e2d-48fe-8d0d-f3bffe8596cf.png)

Jeżeli praktykant przeszedł pomyślnie formularz rejestracji, to jego zadaniem będzie potwierdzenie konta korzystając z linku aktywacji, który zostanie wysłany na podany adres e-mail w formularzu. Link aktywacyjny wygasa po 3 dniach.

![image](https://user-images.githubusercontent.com/72854881/217894958-7f20159d-e2ca-4586-89c4-3efd31fdf80b.png)

Po kliknięciu w link aktywacyjny, praktykant otrzyma informację o pomyślnej weryfikacji konta.

![image](https://user-images.githubusercontent.com/72854881/217895041-0a96602b-9f62-43f5-87d0-e390c785f6b7.png)

Użytkownicy aplikacji mogą również zrestartować hasło.

![image](https://user-images.githubusercontent.com/72854881/217895113-dbaa31bf-4d2b-4cc4-a1be-1911490ad278.png)

Podobnie jak w przypadku aktywacji konta, na podany adres e-mail zostanie wysłana wiadomość z linkiem do resetowania hasła.

![image](https://user-images.githubusercontent.com/72854881/217895198-e7156595-0fc4-4d1a-a754-3815ca8f1fba.png)

![image](https://user-images.githubusercontent.com/72854881/217895234-c3a3946a-58c1-470a-b6cb-6f4f4ee4c075.png)

##Do panelu administratora ma dostęp użytkownik, który posiada rolę administratora. Jest to bardzo odpowiedzialna rola, gdyż w tym panelu jest możliwość dodania nowego
użytkownika do bazy danych, przyznawania jak i odbierania ról innym kontom, a także zmiany ich adresu e-mail i hasła.

![image](https://user-images.githubusercontent.com/72854881/217895430-de04b44a-9a45-44fc-8244-9c82df08923c.png)

Poniżej przykład wyszukiwania użytkowników, wpisana wartość to "j".

![image](https://user-images.githubusercontent.com/72854881/217895640-5c1fb21d-a11c-41a1-9a60-578c41d5e27f.png)

Przycisk znajdujący się obok pola wyszukiwania jest odpowiedzialny za dodanie użytkownika. Po kliknięciu w ten przycisk otwiera się okno dialogowe, w którym administrator może dodać użytkownika jak i przyznać mu role początkowe.

![image](https://user-images.githubusercontent.com/72854881/217895776-c020f06a-2a44-4318-946a-d322bbfb1faf.png)

Pod panelem służącym do wyszukiwania, znajduje się przycisk “Zmień opcje szukania”, który odpowiada za zmianę opcji szukania, która pozwala na znalezienie użytkowników po ich nazwisku, roku utworzenia konta a także nazwie firmy, do której są przydzieleni.

Panel również posiada sortowania użytkowników po ich rolach.

![image](https://user-images.githubusercontent.com/72854881/217895938-8bf3c367-42e8-4ce1-b716-e0fb5c83a9bb.png)

Po wyborze wyszukanej roli, w tym przypadku roli ‘Dyrektor’, ukazują się w tabeli użytkownicy tylko z tą rolą.

![image](https://user-images.githubusercontent.com/72854881/217896045-933e71a7-103c-449d-89fd-16516e5b2efd.png)

Administrator również może sprawdzić użytkowników z niezweryfikowanymi kontami używając przycisku ‘Niezatwierdzone’ jak i zweryfikowanymi korzystając z przycisku ‘Zatwierdzone’ , a także przycisku ‘Wszystkie’, ukazującego wszystkie konta zweryfikowane jak i niezweryfikowane.

![image](https://user-images.githubusercontent.com/72854881/217896189-4dcfba34-2254-4c61-8ca2-e9af6dc4d574.png)

Jeżeli administrator przejdzie do edycji konta, ukażą mu się szczegółowe informacje dotyczące danego użytkownika, takie jak nazwa firmy, imię, nazwisko, datę utworzenia konta, a także status jego weryfikacji, tutaj administrator może również zweryfikować konto jak i zmienić adres e-mail użytkownika jak i również hasło.

![image](https://user-images.githubusercontent.com/72854881/217896318-0d8b975b-117f-4d4d-8339-d77d7760ef41.png)

##Profil uczelnianego opiekuna praktyk jak i zakładowego, zostały wykonane w identyczny sposób.

![image](https://user-images.githubusercontent.com/72854881/217896388-698b78c4-27e7-44ba-8456-540a6d35360e.png)

Opiekunowie są odpowiedzialni za nadzorowanie studentów, którzy są do nich przypisani

Na przykładzie powyżej przedstawiono dostęp do dziennika dwóch studentów ‘2’ i’18737@student-ans.elblag.pl’. Opiekunowie mają możliwość akceptacji oraz odrzucenia
dziennego raportu z praktyki, jak i wejścia w dokładniejszą jego edycję.

![image](https://user-images.githubusercontent.com/72854881/217896510-f6388eff-6c69-4344-ae05-37c4e68c7d12.png)

Aby pobrać załącznik, należy nacisnąć zielony przycisk obok nazwy załącznika. 

![image](https://user-images.githubusercontent.com/72854881/217896541-7e295b7c-44b5-42e4-b03e-fd9692437877.png)

Komentarze wyświetlane są tylko dla tego opiekuna, który ten komentarz zamieścił, czyli opiekun uczelniany nie będzie miał podglądu komentarzy wysłanych przez opiekuna
zakładowego. 

![image](https://user-images.githubusercontent.com/72854881/217896661-f87a8936-2309-4153-a056-6dc3579d8b1a.png)

Komentarze wyświetlane są tylko dla tego opiekuna, który ten komentarz zamieścił, czyli opiekun uczelniany nie będzie miał podglądu komentarzy wysłanych przez opiekuna
zakładowego. 

![image](https://user-images.githubusercontent.com/72854881/217896900-07fac3f6-7d33-4a11-aafb-5fe45a58b8af.png)

Jeżeli opiekun zaakceptuje wprowadzony przez studenta opis dnia praktyk lub go odrzuci, wówczas ten dzień przeniesie się do jego historii.

![image](https://user-images.githubusercontent.com/72854881/217896955-bb53e927-1107-4017-bcb7-d1a9c4d542fc.png)

Opiekun może także skorzystać z opcji ukazania tylko: odrzuconych dni (Przycisk ‘Odrzucone’), zatwierdzonych (przycisk ‘Zatwierdzone’), jak i wszystkich (Przycisk
‘Wszystkie’). 

![image](https://user-images.githubusercontent.com/72854881/217897167-9eebe78f-f805-4b3f-a8ed-a844208562a8.png)

Istnieje możliwość zmiany opcji wyszukiwania, w której to opiekun może wyszukać praktykanta po jego nazwisku.

![image](https://user-images.githubusercontent.com/72854881/217897277-58ba6ab5-c556-4362-991a-45cca9f60afa.png)

##Opiekun uczelniany analizuje opis efektów uczenia się praktykanta. Wygląd komponentu, w którym oceniane są efekty uczenia się, jest bliski do wyglądowi profili opiekuna uczelnianego jak i zakładowego, oraz zawiera funkcje wyszukiwania studenta jak i stronicowanie.

![image](https://user-images.githubusercontent.com/72854881/217897407-5fe0c522-91fb-4be7-bb10-96a661133e79.png)

Opiekun może sprawdzić stan osiągnięcia efektów uczenia się dla konkretnego praktykanta.

![image](https://user-images.githubusercontent.com/72854881/217897452-772f463d-4bc5-42dd-a703-ba2c3a169fd2.png)

















