function login(){
    const auth = firebase.auth();
	var email = document.getElementById("email");
	var password = document.getElementById("password");
	const promise = auth.signInWithEmailAndPassword(email.value, password.value);
	promise.catch(e => document.getElementById('message').innerHTML = e.message);	
}
firebase.auth().onAuthStateChanged(function(user) {
	if (user){
		document.getElementById('loginBtn').innerHTML = 'Logged in as: '+user.email;
		firebase.database().ref(user.uid).on('value', function(snapshot){
			if(window.location.href === 'https://kvkportal.github.io/student.html'){
				if(snapshot.val().type === 'Student'){
					document.getElementById('username').innerHTML='Welcome to student portal, ' + snapshot.val().name + '!';
					document.getElementById('marks').innerHTML='Your marks are: Maths: ' + snapshot.val().mathsMarks + ', Hindi: '+ snapshot.val().hindiMarks+ ', English: '+ snapshot.val().englishMarks + ', Social Science: '+ snapshot.val().socialMarks+ ', Science: '+ snapshot.val().scienceMarks+ ', Sanskrit: '+ snapshot.val().sktMarks;
					document.getElementById('notes').innerHTML='Your update on notes are: Maths: ' + snapshot.val().mathsNotes + ', Hindi: '+ snapshot.val().hindiNotes + ', Engilsh: '+snapshot.val().englishNotes+', Science: '+snapshot.val().scienceNotes+ ', Sanskrit: '+ snapshot.val().sktNotes+ ', Social: '+ snapshot.val().socialNotes;
					document.getElementById('repCard').src=snapshot.val().repCard;
					return;
				}
				else{
					document.getElementById('mainStudent').remove();
				}
			}
			else if(window.location.href === 'https://kvkportal.github.io/principal.html'){
				if(snapshot.val().type === 'Principal'){
					return;
				}
				else{
					document.getElementById('mainSecPrincipal').remove();
				}
			}
			else if(window.location.href === 'https://kvkportal.github.io/teacher.html'){
				if(snapshot.val().type === 'Principal'){
					return;
				}
				else if(snapshot.val().type === 'Teacher'){
					return;
				}
				else{
					document.getElementById('mainTeacher').remove();
				}
			}
			
		});
	}
	else{
		if(window.location.href === 'https://kvkportal.github.io/student.html'){
			document.getElementById('mainStudent').remove();
			}
		else if(window.location.href === 'https://kvkportal.github.io/principal.html'){
			document.getElementById('mainSecPrincipal').remove();
		}
		else if(window.location.href === 'https://kvkportal.github.io/teacher.html'){
			document.getElementById('mainTeacher').remove();
		}
	}
});
function signOut() {
	const auth = firebase.auth();
    auth.signOut();
    window.location.reload()
  }



function createStudent() {
	var nameV, classV;
	nameV=document.getElementById('full-name').value;
	classV=document.getElementById('class-input').value;
	uidV=document.getElementById('uid-input').value;
	let userRef = firebase.database().ref(uidV+'/');
 	userRef.set({
		'name': nameV,
        'class': classV,
		'type': 'Student',
		'mathsMarks' : '',
		'hindiMarks' : '',
		'socialMarks' : '',
		'englishMarks' : '',
		'scienceMarks' : '',
		'sktMarks' : '',
		'mathsNotes' : '',
		'hindiNotes' : '',
		'socialNotes' : '',
		'englishNotes' : '',
		'scienceNotes' : '',
		'sktNotes' : '',
		'repCard' : ''
	});
}
function updateMarks() {
	var mathsMarks, hindiMarks, sstMarks, englishMarks, scienceMarks, sktMarks, nameVM, classVM;
	mathsMarks = document.getElementById('maths').value;
	uidV = document.getElementById('uuid').value;
	hindiMarks = document.getElementById('hindi').value;
	sktMarks = document.getElementById('skt').value;
	sstMarks = document.getElementById('sst').value;
	scienceMarks = document.getElementById('science').value;
	englishMarks = document.getElementById('english').value;


	let userRef = firebase.database().ref(uidV+'/');
 	userRef.update({
		'mathsMarks' : mathsMarks,
		'hindiMarks' : hindiMarks,
		'socialMarks' : sstMarks,
		'englishMarks' : englishMarks,
		'scienceMarks' : scienceMarks,
		'sktMarks' : sktMarks,
	});
}
