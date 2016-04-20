/**
 * Created by Zhaky on 18/02/2014.
 */

var ListStudents = {

    initialize: function() {

        $('staff').observe('click', function() {
            showContent('list_staff');
        });

        $('profile').observe('click', function() {
            showContent('my_profile');

        });


        $('messages').observe('click', function() {
            showContent('messages_div');
        });

        $('received').observe('click', function() {
            $('received_messages').show();
            $('sent_messages').hide();
            $('received').style.textDecoration = 'underline';
            $('sent').style.textDecoration = 'none';
        });

        $('sent').observe('click', function() {
            $('sent_messages').show();
            $('received_messages').hide();
            $('sent').style.textDecoration = 'underline';
            $('received').style.textDecoration = 'none';
        });

        $('messages_side').observe('click', function() {
            showContent('messages_div');
        });


        $('dashboard').observe('click', function() {
            showContent('tutor_reports_div');

        });

        $('dashboard_side').observe('click', function() {
            showContent('tutor_reports_div');

        });

        $('staff_side').observe('click', function () {
            showContent('list_staff');

        });

        $('back_to_students').observe('click', function() {
            showContent('list_students');
        });

        $('back_to_students_from_staff').observe('click', function() {
            showContent('list_students');
        });

        $('back_to_students_from_tutor_allocation').observe('click', function() {
            ajaxForSearchStudent('', '')
            showContent('list_students');
        });



        $('back_to_student_profile').observe('click', function() {

            var studentId = $('student_id_dashboard').value;
            ajaxForStudentDetails(studentId)
        });


        $('back_to_received_messages').observe('click', function() {

            $('messages_details_div').hide();
            $('messages_div').show();
            $('received_messages').show();
            $('received').style.textDecoration = 'underline';
            $('sent').style.textDecoration = 'none';
            ajaxForTutorMessages()

        });



        $('students').observe('click', function () {
            showContent('list_students');

        });

        $('students_side').observe('click', function () {
            showContent('list_students');

        });

        $('btnAllocate').observe('click', function () {

            var selectedStudents = "";
            $$('#students_table input').each(function(checkbox) {

                if (checkbox.checked == true) {

                    selectedStudents += $(checkbox).up('tr').id + ",";
                }
                });
            if (selectedStudents != "") {
                ajaxForSelectedStudents(selectedStudents);
            } else {
                alert("Please select students to allocate!");
            }
        });


        $('btnConfirmAllocation').observe('click', function () {

            var selectedStudents = "";
            $$('#selected_students_table td').each(function(student) {
                var intRegex = /^\d+$/;
                if (intRegex.test(student.innerHTML)) {
                    selectedStudents += student.innerHTML + ",";
                }
            });

            var selectedTutor = $('select_tutor').value;

            ajaxForAllocateStudentsToTutor(selectedStudents, selectedTutor);

        });

        $('profile_side').observe('click', function() {
            showContent('my_profile');

        });

        $('back_to_staff').observe('click', function() {
            showContent('list_staff');
        });

        $('student_dashboard').observe('click', function() {
            var studentId = $('student_detail_id').value;
            ajaxForStudentDashboard(studentId);
            //showContent('student_reports_div');

        });


        document.body.on("click", '#staff_table', function() {
            $$('#staff_table tr').each(function(staff) {
                staff.observe('click', function() {

                    ajaxForStaffDetails(staff.id)
                });
            })

        });


        document.body.on("click", '#received_messages', function() {


            $$('#received_messages div').each(function(message) {

                message.observe('mouseover', function() {

                    this.style.cursor='pointer';
                });

                message.observe('click', function() {

                    var message_id = message.id.substr(8);
                    showContent('messages_details_div');
                    ajaxForMessageDetails(message_id);
                    $('reply_result').innerHTML = "";
                });
        })

        })


        document.body.on("click", '#students_table', function() {
            $$('#students_table span').each(function(student) {
                student.observe('click', function() {

                    var studentId = $(student).up('tr').id;

                    ajaxForStudentDetails(studentId);
                });
            })

        });


        document.body.on("click", '#students_table', function() {
            $$('#students_table span').each(function(student) {
                student.observe('mouseover', function() {

                    this.style.cursor='pointer';
                });
            })

        });


        document.body.on("click", '#students_table', function() {
            $$('#students_table tr').each(function(student) {
                student.observe('click', function() {

                    var checkBox = $("chkBox_" + student.id);

                    if (checkBox.checked == true) {

                        checkBox.checked = false;

                    } else if (checkBox.checked == false) {

                        checkBox.checked = true;
                    }
                });
            })

        });

        $('personal_tutor').observe('click', function() {
            var personal_tutor = $("personal_tutor").innerHTML;
            var personal_tutor_array = personal_tutor.split(" ");
            var title = personal_tutor_array[0];
            var first_name = personal_tutor_array[1];
            var last_name = personal_tutor_array[2];
            ajaxForTutorDetails(title, first_name, last_name);

        });


        $('filter_search').observe('change', function() {
            var filter_search = $('filter_search').value;
            var search_term = $('search_student').value;
            ajaxForSearchStudent(search_term, filter_search)
        });

        $('search_student').observe('keyup', function() {
            var filter_search = $('filter_search').value;
            var search_term = $('search_student').value;
            ajaxForSearchStudent(search_term, filter_search)
        });

        /*$('students').observe('click', function() {
            $('list_students').show();
        });*/

        $('filter_search_staff').observe('change', function() {
            var filter_search_staff = $('filter_search_staff').value;
            var search_term_staff = $('search_staff').value;
            ajaxForSearchStaff(search_term_staff, filter_search_staff)
        });

        $('search_staff').observe('keyup', function() {
            var filter_search_staff = $('filter_search_staff').value;
            var search_term_staff = $('search_staff').value;
            ajaxForSearchStaff(search_term_staff, filter_search_staff)
        });



        document.body.on("click", "#send_reply", function(event, cell) {

            var reply_text = $('reply_area').value;
            var message_subject = $('message_details_subject').innerHTML;
            var student_receiver = $('message_sender_id').value;
            var message_id = $('received_message_id').value;

            if ((reply_text != '') && (reply_text != 'Reply to message here ...') && (message_subject !='')) {

                ajaxForReplyToMessage(message_id, reply_text, message_subject, student_receiver);
            } else {
                alert("Please write your message in the text area!");
            }


        });





        $('sort_dashboard_data').observe('change', function() {
            var sort_dashboard_data = $('sort_dashboard_data').value;
            var filter_dashboard_data = $('filter_dashboard_data').value;
            var search_dashboard_data = $('search_dashboard_data').value;
            ajaxForSearchStaffDashboardData(sort_dashboard_data, filter_dashboard_data, search_dashboard_data);

        });

        $('filter_dashboard_data').observe('change', function() {
            var sort_dashboard_data = $('sort_dashboard_data').value;
            var filter_dashboard_data = $('filter_dashboard_data').value;
            var search_dashboard_data = $('search_dashboard_data').value;
            ajaxForSearchStaffDashboardData(sort_dashboard_data, filter_dashboard_data, search_dashboard_data);

        });

        $('search_dashboard_data').observe('keyup', function() {
            var sort_dashboard_data = $('sort_dashboard_data').value;
            var filter_dashboard_data = $('filter_dashboard_data').value;
            var search_dashboard_data = $('search_dashboard_data').value;
            ajaxForSearchStaffDashboardData(sort_dashboard_data, filter_dashboard_data, search_dashboard_data);

        })



        $$('#main_nav li').each(function(tab) {
            tab.observe('click', function() {
                $$('#main_nav li').each(function(item) {
                    item.removeClassName('active');
                });
                tab.addClassName('active');
            });
        });

    }
}


function showContent(showItem) {

    $('list_staff').hide();
    $('list_students').hide();
    $('my_profile').hide();
    $('student_details_div').hide();
    $('select_tutor_div').hide();
    $('messages_div').hide();
    /*$('my_tutor').hide();
    $('meetings_div').hide();
    $('new_message').hide();

    $('new_meeting_request').hide();
    $('blog_div').hide();
    $('new_blog').hide();
    $('blog_details').hide();
    $('uploads_div').hide();
    $('reports_div').hide();*/
    $('student_reports_div').hide();
    $('tutor_reports_div').hide();
    $('staff_details_div').hide();
    $('student_tutor_details_div').hide();
    //$('received_messages').hide();
    $('sent_messages').hide();
    $('messages_details_div').hide();
    if (showItem) {console.log(showItem);
        $(showItem).show();
    }
    if ($('etutor_canvas').hasClassName('move-right') == true) {
        $('etutor_canvas').removeClassName('move-right');
    }
}



function ajaxForReplyToMessage(message_id, reply_text, message_subject, receiver) {

    new Ajax.Request('send-reply-to-message-json', {
        parameters: {
            message_id: message_id,
            reply_text: reply_text,
            message_subject: message_subject,
            receiver:receiver

        }, onSuccess: function(response) {

            var response = response.responseText.evalJSON();

            $('reply_result').innerHTML = response;
            $('reply_area').value = "";
            ajaxForMessageReplies(message_id);

        }
    });

}




function ajaxForMessageReplies(message_id) {

    new Ajax.Request('get-message-replies-json', {
        parameters: {
            message_id: message_id

        },

        onSuccess: function(response) {

            var messageReplies = response.responseText.evalJSON();


            $('message_reply').remove();



            $('received_messages_replies').insert('<div id="message_reply"></div>');

            for (var i = 0;i < messageReplies.length; i++) {
                $('message_reply').insert('<div class="message_sent">' +
                    '<ul>' +
                    '<li><label>From: </label>Me</li>' +
                    '<li><label>Subject: </label>' + messageReplies[i]['subject'] + '</li>' +
                    '<li><label>Message Text: </label>' + messageReplies[i]['message_body'] + '</li>' +
                    '</ul>' +
                    '<p style="text-align: right">Sent on:' + messageReplies[i]['date'] + '</p> </div>');

            }
        }
    });

}



function ajaxForTutorMessages() {

    new Ajax.Request('get-tutor-messages-json', {

        onSuccess: function(response) {

            var allMessages = response.responseText.evalJSON();

            var messagesReceived = allMessages['messagesReceived'];
            var messagesSent = allMessages['messagesSent'];
            var unreadMessages = allMessages['unreadMessages'];

            $('received_messages').remove();

            $('messages_details_div').hide();

            $('all_messages_div').insert('<div id="received_messages"></div>');

            for (var i = 0;i < messagesReceived.length; i++) {
                   var insert = '<div id="message_' + messagesReceived[i]['message_id'] + '" class="message_received" style="background-color:#E5F1F5;margin: 2px 5px 2px;!important; padding: 5px;border-radius: 0px">';
                        if (messagesReceived[i]['message_read'] == 0) {
                            insert += '<img src="../img/unread.png" width="10px" height="10px" style="float: left">'
                        }
                        insert += ' <p style="text-align: left"><span>From:</span>' + messagesReceived[i]['sender'] +
                            '<span>Subject: </span>' + messagesReceived[i]['subject'] +
                    '<span style="float: right">Received on:' + messagesReceived[i]['date'] + '</span></p></div>';
                $('received_messages').insert(insert);
            }

            $('new_message_img').innerHTML = unreadMessages;

        }
    });

}

function ajaxForSelectedStudents(selectedStudents) {

    new Ajax.Request('show-list-of-selected-students-json', {
        parameters: {
            selectedStudents: selectedStudents
        },
        onSuccess:function(response){

            showContent('select_tutor_div');
            $('allocation_result').innerHTML = "";

            var selectedStudentsDetails = response.responseText.evalJSON();



            var table_string = '<table id="selected_students_table" class="reports"><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Current Tutor</th></tr>';


            for (var n = 0; n < selectedStudentsDetails.length; n++) {


                 table_string += '<tr>';

                for (var value in selectedStudentsDetails[n]) {

                    if ((value != "staff_id") && (value != 'student_email') && (value != 'email') && (value != 'staff_firstname')) {

                            table_string += '<td>' + selectedStudentsDetails[n][value] + '</td>';
                    }

                }

                table_string +='</tr>';


            }

            table_string +='</table>';

            $('selected_students_div').update(table_string);

        }});


}


function ajaxForSearchStudent(search_term, filter_search) {

    new Ajax.Request('search-students-json', {
        parameters: {
            search_term: search_term,
            filter_search: filter_search
        },
        onSuccess:function(response){

            showContent('list_students');
            var students = response.responseText.evalJSON();

            $$('#students_table td').each(function(item) {
                var row = $(item).up('tr');

                var table = $('students_table');

                table.deleteRow($(row).rowIndex);

            })

            var heading_row = '<tr><th>Student ID</th><th class="hide-for-small-only">Title</th><th>First Name</th><th>Last Name</th><th class="hide-for-medium-down">Gender</th class="hide-for-medium-down"><th>DOB</th>' +
                '<th class="hide-for-small-only">Email</th><th class="hide-for-medium-down">Address</th><th class="hide-for-medium-down">City</th><th class="hide-for-medium-down">Post Code</th><th class="hide-for-medium-down">Photo</th>' +
                '<th class="hide-for-small-only">Tutor</th><th></th></tr>';
            var table = $('students_table');


            for (var n = 0; n < students.length; n++) {


                var insert_row_string = '<tr>';

                for (var value in students[n]) {

                    if ((value != 'staff_title') && (value != 'staff_firstname') && (value != 'staff_lastname')) {
                        if (value == 'student_photo') {
                            insert_row_string += '<td class="hide-for-medium-down"><img src="../img/etutorimages/' + students[n][value] + '"' + 'width="50px">' + '</td>';

                        }
                        else if ((value == 'gender') || (value == 'address') || (value == 'post_code') || (value == 'city') || (value == 'dob')) {
                                insert_row_string += '<td class="hide-for-medium-down">' + students[n][value] + '</td>';

                        }

                        else if ((value == 'student_email') || (value == 'title')) {
                            insert_row_string += '<td class="hide-for-small-only">' + students[n][value] + '</td>';
                        }

                        else if (value == 'student_lastname') {
                            insert_row_string += '<td><span onclick="">' + students[n][value] +'</span></td>';
                        }
                        else {
                            insert_row_string += '<td>' + students[n][value] +'</td>';
                        }




                    }
            }
                if (students[n]['staff_firstname'] != null) {
                    insert_row_string += '<td class="hide-for-small-only">' + students[n]['staff_title'] + ' ' +  students[n]['staff_firstname'] + ' ' + students[n]['staff_lastname'] +'</td>';
                } else {
                    insert_row_string += '<td class="hide-for-small-only"></td>';
                }
                var table = $('students_table');

                insert_row_string +='<td><input id="chkBox_' + students[n]['student_id'] + '"' + 'type="checkbox"/>' + '</td></tr>';
                var new_row = $(table.insertRow(n)).update(insert_row_string);
                new_row.id = students[n]['student_id'];

            }

            if (students.length > 0) {

                $(table.insertRow(0)).update(heading_row);
                $('students_error').hide();
            } else {
                $('students_error').show();
            }

        }});


}

function ajaxForStaffDetails(staffId) {

    new Ajax.Request('show-staff-details-json', {
        parameters: {
            staffId: staffId
        },

        onSuccess: function(response) {

            showContent('staff_details_div');


            var staffDetails = response.responseText.evalJSON();

            $('staff_title').innerHTML = staffDetails['staff_title'];
            $('staff_firstname').innerHTML = staffDetails['staff_firstname'];
            $('staff_lastname').innerHTML = staffDetails['staff_lastname'];
            $('job_title').innerHTML = staffDetails['job_title'];
            $('email').innerHTML = '<a href="mailto:' + staffDetails['email'] +'">'+ staffDetails['email'] + '</a>';
            $('room').innerHTML = staffDetails['room'];
            $('working_hours').innerHTML = staffDetails['working_hours'];
            $('office_number').innerHTML = staffDetails['office_number'];
            $('staff_photo').setAttribute('src','../img/etutorimages/'+ staffDetails['photo']);

        }
    });
}



function ajaxForMessageDetails(messageId) {

    new Ajax.Request('show-message-details-json', {
        parameters: {
            messageId: messageId
        },

        onSuccess: function(response) {




            var messageDetails = response.responseText.evalJSON();
            var message = messageDetails['message'];
            var from = messageDetails['from'];console.log(message[0]['student_sender']);

            $('message_details_from').innerHTML = from;
            $('message_details_subject').innerHTML = message[0]['subject'];
            $('message_details_text').innerHTML = message[0]['message_body'];
            $('message_details_date').innerHTML = message[0]['date'];
            $('message_sender_id').value = message[0]['student_sender'];
            $('received_message_id').value = message[0]['message_id'];

            ajaxForMessageReplies(message[0]['message_id']);


        }
    });
}



function ajaxForAllocateStudentsToTutor(selectedStudents, selectedTutor) {

    new Ajax.Request('allocate-students-to-tutor-json', {
        parameters: {
            selectedStudents: selectedStudents,
            selectedTutor: selectedTutor

        }, onSuccess: function(response) {

            var response = response.responseText.evalJSON();

            $('allocation_result').innerHTML = response;


        }
    });

}

function ajaxForStudentDetails(studentId) {

    new Ajax.Request('show-student-details-json', {
        parameters: {
            studentId: studentId
        },

        onSuccess: function(response) {

            showContent('student_details_div');


            var studentDetails = response.responseText.evalJSON();

            $('student_detail_title').innerHTML = studentDetails['title'];
            $('student_detail_firstname').innerHTML = studentDetails['student_firstname'];
            $('student_detail_lastname').innerHTML = studentDetails['student_lastname'];
            $('student_detail_nationality').innerHTML = studentDetails['nationality'];
            $('student_detail_email').innerHTML = '<a href="mailto:' + studentDetails['student_email'] +'">'+ studentDetails['student_email'] + '</a>';
            $('student_detail_address').innerHTML = studentDetails['address'];
            $('student_detail_dob').innerHTML = studentDetails['dob'];
            $('student_detail_city').innerHTML = studentDetails['city'];
            $('student_detail_postcode').innerHTML = studentDetails['post_code'];
            $('student_detail_ac_year').innerHTML = studentDetails['academic_year'];
            $('student_detail_programme').innerHTML = studentDetails['programme_enrolled'];
            $('student_detail_home_overseas').innerHTML = studentDetails['home_overseas'];
            $('personal_tutor').innerHTML = (studentDetails['staff_firstname'])?studentDetails['staff_title'] + " " + studentDetails['staff_firstname'] + " " + studentDetails['staff_lastname']:"Not Allocated";
            $('student_photo').setAttribute('src','../img/etutorimages/'+ studentDetails['student_photo']);
            $('student_detail_id').value = studentDetails['student_id'];

        }
    });
}


function ajaxForSearchStaff(search_term, filter_search) {

    new Ajax.Request('search-staff-json', {
        parameters: {
            search_term: search_term,
            filter_search: filter_search
        },
        onSuccess:function(response){

            var staff = response.responseText.evalJSON();

            $$('#staff_table td').each(function(item) {
                var row = $(item).up('tr');

                var table = $('staff_table');

                table.deleteRow($(row).rowIndex);

            })

            var heading_row = '<tr><th>Title</th><th>First Name</th><th>Last Name</th><th>Job Title</th></tr>';
            var table = $('staff_table');


            for (var n = 0; n < staff.length; n++) {


                var insert_row_string = '<tr>';

                for (var value in staff[n]) {

                    if (value != "staff_id") {

                        insert_row_string += '<td>' + staff[n][value] + '</td>';
                    }

                }

                insert_row_string +='</tr>';
                var new_row =  $(table.insertRow(n)).update(insert_row_string);
                new_row.id = staff[n]['staff_id'];

            }

            if (staff.length > 0) {

                $(table.insertRow(0)).update(heading_row);
                $('students_error').hide();
            } else {
                $('students_error').show();
            }

        }});
}




function  ajaxForSearchStaffDashboardData(sort_dashboard_data, filter_dashboard_data, search_dashboard_data) {

    new Ajax.Request('search-staff-dashboard-json', {
        parameters: {
            sortDashboardData: sort_dashboard_data,
            filterDashboardData: filter_dashboard_data,
            searchDashboardData: search_dashboard_data
        },
        onSuccess:function(response){

            var staffDashboardData = response.responseText.evalJSON();

            $$('#staff_dashboard_table td').each(function(item) {
                var row = $(item).up('tr');

                var table = $('staff_dashboard_table');

                table.deleteRow($(row).rowIndex);

            })

            var heading_row_one = '<tr><th colspan="3">Student</th>' +
                              '<th colspan="2">Files</th>' +
                              '<th colspan="2">Blogs</th>' +
                              '<th colspan="5">Meetings</th>' +
                              '<th id="from_tutor" colspan="2">Messages From Me</th>' +
                              '<th id="to_tutor" colspan="2">Messages To Me</th></tr>';
            var heading_row_two ='<tr>' +
                                    '<th>ID</th>' +
                                    '<th>First Name</th>' +
                                    '<th>Last Name</th>' +
                                    '<th>Number</th>' +
                                    '<th>Last</th>' +
                                    '<th>Number</th>' +
                                    '<th>Last</th>' +
                                    '<th>Requests</th>' +
                                    '<th>Real</th>' +
                                    '<th>Virtual</th>' +
                                    '<th>Cancelled</th>' +
                                    '<th>Last</th>' +
                                    '<th>Number</th>' +
                                    '<th>Last</th>' +
                                    '<th>Number</th>' +
                                    '<th>Last</th>' +
                                 '</tr>';
            var table = $('staff_dashboard_table');




            if (staffDashboardData.length > 0) {

                $(table.insertRow(0)).update(heading_row_one);
                $(table.insertRow(1)).update(heading_row_two);


                for (var n = 0; n < staffDashboardData.length; n++) {//console.log(staffDashboardData[n]['student_id']);

                        var i = 2
                    var insert_row_string = '<tr><td>' + staffDashboardData[n]['student_id'] + '</td>' +
                        '<td>' + staffDashboardData[n]['student_firstname'] + '</td>' +
                        '<td>' + staffDashboardData[n]['student_lastname'] + '</td>' +
                        '<td>' + ((staffDashboardData[n]['uploaded_files'])?(staffDashboardData[n]['uploaded_files']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['last_uploaded_file'])?(staffDashboardData[n]['last_uploaded_file']):"none") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['created_blogs'])?(staffDashboardData[n]['created_blogs']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['last_blog'])?(staffDashboardData[n]['last_blog']):"none") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['meeting_requests'])?(staffDashboardData[n]['meeting_requests']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['real_meetings'])?(staffDashboardData[n]['real_meetings']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['virtual_meetings'])?(staffDashboardData[n]['virtual_meetings']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['cancelled_meeting_requests'])?(staffDashboardData[n]['cancelled_meeting_requests']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['last_meeting'])?(staffDashboardData[n]['last_meeting']):"none") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['sent_messages'])?(staffDashboardData[n]['sent_messages']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['last_sent_message'])?(staffDashboardData[n]['last_sent_message']):"none") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['received_messages'])?(staffDashboardData[n]['received_messages']):"0") + '</td>' +
                        '<td>' + ((staffDashboardData[n]['last_received_message'])?(staffDashboardData[n]['last_received_message']):"none") + '</td></tr>';


                    var new_row =  $(table.insertRow(i)).update(insert_row_string);
                    i++;

                }

            } else {

            }

        }});
}





function ajaxForTutorDetails(title, firstName, lastName) {

    new Ajax.Request('show-tutor-details-json', {
        parameters: {
            title: title,
            firstName: firstName,
            lastName: lastName
        },

        onSuccess: function(response) {

            showContent('student_tutor_details_div');


            var staffDetails = response.responseText.evalJSON();

            $('student_tutor_title').innerHTML = staffDetails['staff_title'];
            $('student_tutor_firstname').innerHTML = staffDetails['staff_firstname'];
            $('student_tutor_lastname').innerHTML = staffDetails['staff_lastname'];
            $('student_tutor_job_title').innerHTML = staffDetails['job_title'];
            $('student_tutor_email').innerHTML =  '<a href="mailto:' + staffDetails['email'] +'">'+ staffDetails['email'] + '</a>';
            $('student_tutor_room').innerHTML = staffDetails['room'];
            $('student_tutor_working_hours').innerHTML = staffDetails['working_hours'];
            $('student_tutor_office_number').innerHTML = staffDetails['office_number'];
            $('student_tutor_photo').setAttribute('src','../img/etutorimages/'+ staffDetails['photo']);

        }
    });
}

function ajaxForStudentDashboard(studentId) {

    new Ajax.Request('view-student-dashboard-json', {
        parameters: {
            studentId: studentId
        },

        onSuccess: function(response) {

            showContent('student_reports_div');

            var studentDashboard = response.responseText.evalJSON();

            $('countOfBlogs').innerHTML = studentDashboard['countOfBlogs'];
            $('lastBlog').innerHTML = (studentDashboard['lastBlog'])?studentDashboard['lastBlog']:"none";
            $('realMeetings').innerHTML = studentDashboard['realMeetings'];
            $('virtualMeetings').innerHTML = studentDashboard['virtualMeetings'];
            $('receivedMessages').innerHTML = studentDashboard['receivedMessages'];
            $('sentMessages').innerHTML = studentDashboard['sentMessages'];
            $('lastBlog').innerHTML = (studentDashboard['lastBlog'])?studentDashboard['lastBlog']:"none";
            $('allMeetingRequests').innerHTML = studentDashboard['allMeetingRequests'];
            $('cancelledMeetings').innerHTML = studentDashboard['cancelledMeetings'];
            $('lastMeeting').innerHTML = (studentDashboard['lastMeeting'])?studentDashboard['lastMeeting']:"none";
            $('lastReceivedMessage').innerHTML = (studentDashboard['lastReceivedMessage'])?studentDashboard['lastReceivedMessage']:"none";
            $('lastMeeting').innerHTML = (studentDashboard['lastMeeting'])?studentDashboard['lastMeeting']:"none";
            $('lastSentMessage').innerHTML = (studentDashboard['lastSentMessage'])?studentDashboard['lastSentMessage']:"none";

            $('countOfBlogs_medium').innerHTML = studentDashboard['countOfBlogs'];
            $('realMeetings_medium').innerHTML = studentDashboard['realMeetings'];
            $('virtualMeetings_medium').innerHTML = studentDashboard['virtualMeetings'];
            $('receivedMessages_medium').innerHTML = studentDashboard['receivedMessages'];
            $('sentMessages_medium').innerHTML = studentDashboard['sentMessages'];

            $('student_name').innerHTML = studentDashboard['studentFirstName'] + "'s Dashboard";
            $('from_tutor').innerHTML = "Messages From " + studentDashboard['tutorName'];
            $('to_tutor').innerHTML = "Messages To " + studentDashboard['tutorName'];

            $('student_id_dashboard').value = studentDashboard['studentId'];



        }
    })
}




function ajaxForAllMessages() {

    new Ajax.Request('show-all-messages-json', {

        onSuccess: function(response) {

            var allMessages = response.responseText.evalJSON();

            $('all_messages').remove();

            $('all_messages_div').insert('<div id="all_messages"></div>');

            for (var i = 0;i < allMessages.length; i++) {
                if ((allMessages[i]['student_sender'] != null) && (allMessages[i]['student_receiver'] == null)) {
                    $('all_messages').insert('<div class="message_sent">' +
                        '<ul>' +
                        '<li><label>From: </label>Me</li>' +
                        '<li><label>Subject: </label>' + allMessages[i]['subject'] + '</li>' +
                        '<li><label>Message Text: </label>' + allMessages[i]['message_body'] + '</li>' +
                        '</ul>' +
                        '<p style="text-align: right">Sent on:' + allMessages[i]['date'] + '</p> </div>');
                } else if ((allMessages[i]['student_sender'] == null) && (allMessages[i]['student_receiver'] != null)) {
                    $('all_messages').insert('<div class="message_received">' +
                        '<ul>' +
                        '<li><label>From: </label>Me</li>' +
                        '<li><label>Subject: </label>' + allMessages[i]['subject'] + '</li>' +
                        '<li><label>Message Text: </label>' + allMessages[i]['message_body'] + '</li>' +
                        '</ul>' +
                        '<p style="text-align: right">Sent on:' + allMessages[i]['date'] + '</p> </div>');
                }
            }



        }
    });
}
